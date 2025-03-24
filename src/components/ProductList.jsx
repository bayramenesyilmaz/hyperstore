"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import { filterProductsByCategory } from "@/data/productActions";

export default function ProductList({ products }) {
  const searchParams = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const category = searchParams.get("category") || "all";

  useEffect(() => {
    setFilteredProducts(filterProductsByCategory(products, category));
  }, [category, products]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Ürünler</h1>
        <CategoryFilter currentCategory={category} />
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center mt-10 text-gray-500">
          Bu kategoride ürün bulunamadı.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 mt-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
