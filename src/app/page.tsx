"use client";

import Products from "./products";
import useSWR from "swr";

const fetcher = () =>
    fetch(
        "http://internal-edge-qa.ssense.com/products/products?language=fr&country=fr"
    ).then((res) => res.json());

function useProducts() {
    const { data, error, isLoading } = useSWR(
        "http://internal-edge-qa.ssense.com/products/products?language=fr&country=fr",
        fetcher
    );

    console.log(data);

    return {
        products: data,
        isLoading,
        isError: error,
    };
}

export default async function Home(req: any) {
    const { products, isLoading } = useProducts();
    if (isLoading) return <div>loading...</div>;

    console.log(products);

    return (
        <main>
            <Products
                products={products}
                lazy={req.searchParams.lazy}
                priority={req.searchParams.priority}
            />
        </main>
    );
}
