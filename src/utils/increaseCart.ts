export default async function updateCart(
    { cartId, lineId, quantity = 1 }: { cartId: string; lineId: string; quantity?: number }
) {

    const query = `
  mutation cartLinesUpdate($cartId: ID!, $lineId: ID!, $quantity: Int!) {
    cartLinesUpdate(
      cartId: $cartId
      lines: [
        {
          id: $lineId
          quantity: $quantity
        }
      ]
    ) {
      cart {
        id
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
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": process.env.VITE_SHOPIFY_STOREFRONT_TOKEN as string,
        },
        body: JSON.stringify({
            query,
            variables: {
                cartId,
                lineId,
                quantity
            }
        }),
    });

    const json = await res.json();

    if (json.errors) {
        console.error(json.errors);
        throw new Error("Shopify Storefront API error");
    }

    return json.data.cartLinesUpdate.cart;
}