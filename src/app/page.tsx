import Products from "./products";

async function getData() {
    const res = await fetch(
        "http://internal-edge-qa.ssense.com/products/products?language=fr&country=fr"
    );
    return res.json();
}

export default async function Home(req: any) {
    const data = await getData();
    return (
        <main>
            <Products
                products={data.products}
                lazy={req.searchParams.lazy}
                priority={req.searchParams.priority}
            />
        </main>
    );
}
