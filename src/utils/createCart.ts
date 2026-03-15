export default async function createCart(
    { productId, quantity = 1 }: { productId: string, quantity?: number }
) {
    const query = `
    mutation cartCreate($productId: ID!, $quantity: Int!) {
      cartCreate(
        input: {
          lines: [
            {
              quantity: $quantity
              merchandiseId: $productId
            }
          ]
        }
      ) {
        cart {
          id
          createdAt
          updatedAt
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }`;


    const res = await fetch(process.env.STOREFRONT_ENDPOINT as string, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': process.env.VITE_SHOPIFY_STOREFRONT_TOKEN as string,
        },
        body: JSON.stringify({
            query,
            variables: { productId, quantity }
        }),
    });

    const json = await res.json();
    if (json.errors) {
        console.error(json.errors);
        throw new Error('Shopify Storefront API error');
    }
    return json.data;
}