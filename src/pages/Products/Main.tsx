import ItemCard from "@/components/ItemCard";
import { useEffect, useState } from "react";

type ShopifyProduct = {
    id: string;
    title: string;
    handle: string;
    featuredImage: {
        url: string;
    } | null;
    priceRange: {
        minVariantPrice: {
            amount: string;
            currencyCode: string;
        };
    };
};

type ProductsQueryResponse = {
    data?: {
        products?: {
            nodes: ShopifyProduct[];
        };
    };
    errors?: Array<{
        message: string;
    }>;
};

const productsQuery = `
query getProducts($first: Int!) {
  products(first: $first) {
    nodes {
      id
      title
      handle
      featuredImage {
        url
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
    }
  }
}`;

export default function Main() {
    const [items, setItems] = useState<ShopifyProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let active = true;

        const loadProducts = async () => {
            try {
                const domain = import.meta.env.VITE_SHOPIFY_STOREFRONT_DOMAIN as string | undefined;
                const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN as string | undefined;

                if (!domain || !token) {
                    throw new Error("Missing Shopify storefront env variables");
                }

                const response = await fetch(`https://${domain}/api/2024-10/graphql.json`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Shopify-Storefront-Access-Token": token,
                    },
                    body: JSON.stringify({
                        query: productsQuery,
                        variables: { first: 12 },
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Shopify request failed with ${response.status}`);
                }

                const json = (await response.json()) as ProductsQueryResponse;

                if (json.errors?.length) {
                    throw new Error(json.errors.map((entry) => entry.message).join(", "));
                }

                if (!active) {
                    return;
                }

                setItems(json.data?.products?.nodes ?? []);
            } catch (err) {
                if (!active) {
                    return;
                }

                setError(err instanceof Error ? err.message : "Failed to load products");
            } finally {
                if (active) {
                    setIsLoading(false);
                }
            }
        };

        loadProducts();

        return () => {
            active = false;
        };
    }, []);

    return (
        <main className="p-8 w-full">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance mb-5">
                Flowers
            </h1>
            {isLoading && <p className="text-muted-foreground">Loading catalogue...</p>}
            {error && <p className="text-destructive">{error}</p>}
            <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
                {items.map((item) => (
                    <ItemCard
                        key={item.id}
                        title={item.title}
                        price={`${Number(item.priceRange.minVariantPrice.amount).toFixed(2)} ${item.priceRange.minVariantPrice.currencyCode}`}
                        imgSrc={item.featuredImage?.url ?? "https://picsum.photos/400/500"}
                        badge="Shopify"
                        to={`/product/${item.handle}`}
                    />
                ))}
            </div>
        </main>
    )
}