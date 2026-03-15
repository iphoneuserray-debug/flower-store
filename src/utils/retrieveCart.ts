export default async function retrieveCart(
    { cartId }: { cartId: string }
) {
    const query = `
    query getCart($cartId: ID!) {
    cart(id: $cartId) {
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
            attributes {
              key
              value
            }
          }
        }
      }
      attributes {
        key
        value
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
      buyerIdentity {
        email
        phone
        customer {
          id
        }
        countryCode
        preferences {
          delivery {
            deliveryMethod
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
            variables: { cartId }
        }),
    });

    const json = await res.json();
    if (json.errors) {
        console.error(json.errors);
        throw new Error('Shopify Storefront API error');
    }
    return json.data;
}