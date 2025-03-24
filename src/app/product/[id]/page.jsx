import LoadingSpinner from "@/components/Loading";
import ProductDetail from "@/components/ProductDetail";
import { getProductById } from "@/data/productActions";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return notFound();
  }

  return {
    title: product.title,
    description: product.description || "Ürün hakkında detaylı bilgiler.",
    openGraph: {
      title: product.title,
      description: product.description || "Ürün hakkında detaylı bilgiler.",
      images: product.image,
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return notFound();
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProductDetail product={product} />
    </Suspense>
  );
}
