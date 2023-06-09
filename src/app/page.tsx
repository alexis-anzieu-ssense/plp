"use client";

import Products from "./products";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";

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

export default function Home() {
    const { products, isLoading } = useProducts();
    const params = useSearchParams();

    if (isLoading) return <div>loading...</div>;

    return (
        <main>
            <a href="https://plp-amber.vercel.app">default</a> <br />
            <a href="https://plp-amber.vercel.app/?lazy=true">
                lazy loading
            </a>{" "}
            <br />
            <a href="https://plp-amber.vercel.app/?lazy=true&priority=high">
                lazy loading + high priority
            </a>
            <br />
            <Products
                products={products.products}
                lazy={params.get("lazy")}
                priority={params.get("priority")}
            />
        </main>
    );
}
