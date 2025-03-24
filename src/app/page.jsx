import { fetchProducts } from "@/data/productActions";
import LoadingSpinner from "@/components/Loading";
import ProductList from "@/components/ProductList";
import { Suspense } from "react";

export const metadata = {
  title: "Hyper Store",
  description:
    "Hyper Store bir e-ticaret sitesidir. En iyi ürünleri en uygun fiyatlarla satın alabilirsiniz.",
};

export default async function HomePage() {
  const products = await fetchProducts();

  return (
    <section className="container mx-auto px-3 md:px-6 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Hyper Store a Hoşgeldiniz!
      </h1>

      <Suspense fallback={<LoadingSpinner />}>
        <ProductList products={products} />
      </Suspense>
    </section>
  );
}
