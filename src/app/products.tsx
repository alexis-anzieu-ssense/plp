"use client";

export default function Products({ products, lazy, priority }: any) {
    console.log(lazy);
    return (
        <main>
            <h1>Products</h1>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                }}
            >
                {products.map((product: any) => (
                    <div key={product.id}>
                        <img
                            loading={lazy ? "lazy" : "eager"}
                            fetchPriority={priority ?? "auto"}
                            alt={product.name}
                            width={300}
                            height={300}
                            src={product.images.replace(
                                "__IMAGE_PARAMS__/",
                                ""
                            )}
                        />
                    </div>
                ))}
            </div>
        </main>
    );
}
