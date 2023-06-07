"use client";

import Products from "./products";
import useSWR from "swr";

// tslint:disable-next-line
const fetcher = (...args) => fetch(...args).then((res) => res.json());

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
