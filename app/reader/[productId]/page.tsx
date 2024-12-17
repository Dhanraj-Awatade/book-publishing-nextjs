// import EbookReader from "@/components/readers/EbookReader";
// import MaxWidthWrapper from "@/components/MaxWidthWrapper";
// import PdfReader from "@/components/readers/PdfReader";
import { getPayloadClient } from "@/lib/get-payload";
import React from "react";
// import FlutterReader from "@/components/readers/FlutterReader";

interface ReaderPageProps {
    params: {
        productId: string;
    };
}

const ReaderPage = async ({ params }: ReaderPageProps) => {
    const { productId } = params;
    const payload = await getPayloadClient();

    const { docs: products } = await payload.find({
        collection: "products",
        depth: 1,
        where: {
            id: {
                equals: productId,
            },
        },
    });
    const [product] = products;

    if (!product) throw new Error("Product not found");
    if (!product.product_files) throw new Error("Product file not found");
    const productPath =
        typeof product.product_files === "string"
            ? product.product_files
            : product.product_files.url!;
    // const file =
    const productType =
        typeof product.product_files === "string"
            ? "pdf"
            : product.product_files.mimeType === "application/pdf"
            ? "pdf"
            : "epub";
    console.log("productType: ", productType);

    return (
        <div className="h-full w-full">
            <div className="flex-col flex items-center justify-center min-h-lg w-full">
                {/* <div>{productPath}</div> */}

                {/* <FlutterReader
                    productType={productType}
                    productId={productId}
                    productPath={productPath}
                    productName={product.name}
                /> */}

                <iframe
                    className="w-full block h-svh"
                    src={`/index.html?url=${productPath}&title=${product.name}&type=${productType}&id=${product.id}`}
                ></iframe>
            </div>
            {/* <PdfReader productPath={productPath} /> */}
            {/* <EbookReader productPath={productPath} /> */}
        </div>
    );
};

export default ReaderPage;
