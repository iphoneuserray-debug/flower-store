type CartMetafieldInput = {
    ownerId: string;
    key: string;
    type: string;
    value: string;
};

type CartMetafieldsSetUserError = {
    code: string | null;
    field: string[] | null;
    message: string;
};

type CartMetafieldsSetItem = {
    namespace: string;
    key: string;
    value: string;
    type: string;
};

type SetCartMetafieldsArgs = {
    metafields: CartMetafieldInput[];
    endpoint?: string;
    storefrontToken?: string;
};

type GraphQLResponse = {
    data?: {
        cartMetafieldsSet?: {
            metafields: CartMetafieldsSetItem[];
            userErrors: CartMetafieldsSetUserError[];
        };
    };
    errors?: Array<{ message?: string }>;
};

const mutation = `
mutation cartMetafieldsSet($metafields: [CartMetafieldsSetInput!]!) {
  cartMetafieldsSet(metafields: $metafields) {
    metafields {
      namespace
      key
      value
      type
    }
    userErrors {
      code
      field
      message
    }
  }
}`;

export default async function setCartMetafields({
    metafields,
    endpoint = process.env.STOREFRONT_ENDPOINT,
    storefrontToken = process.env.VITE_SHOPIFY_STOREFRONT_TOKEN,
}: SetCartMetafieldsArgs) {
    if (!metafields.length) {
        throw new Error("metafields cannot be empty");
    }

    if (!endpoint) {
        throw new Error("Missing STOREFRONT_ENDPOINT");
    }

    if (!storefrontToken) {
        throw new Error("Missing VITE_SHOPIFY_STOREFRONT_TOKEN");
    }

    const res = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": storefrontToken,
        },
        body: JSON.stringify({
            query: mutation,
            variables: { metafields },
        }),
    });

    const json = (await res.json()) as GraphQLResponse;

    if (json.errors?.length) {
        const message = json.errors.map((error) => error.message ?? "Unknown GraphQL error").join(", ");
        throw new Error(message);
    }

    const result = json.data?.cartMetafieldsSet;

    if (!result) {
        throw new Error("Missing cartMetafieldsSet in response");
    }

    if (result.userErrors.length) {
        const message = result.userErrors.map((error) => error.message).join(", ");
        throw new Error(message);
    }

    return result;
}
