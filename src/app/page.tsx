"use client";

import Products from "./products";
import useSWR from "swr";

const fetcher = (args: any) => fetch(args).then((res) => res.json());

function useProducts() {
    const { data, error, isLoading } = useSWR(
        "https://internal-edge-qa.ssense.com/products/products?language=fr&country=fr",
        fetcher
    );

    return {
        products: data,
        isLoading,
        isError: error,
    };
}

export default function Home(req: any) {
    const { products, isLoading } = useProducts();
    if (isLoading) return <div>loading...</div>;

    return (
        <main>
            <Products
                products={products.products}
                lazy={req.searchParams.lazy}
                priority={req.searchParams.priority}
            />
        </main>
    );
}
