"use client";

import { Button } from "@/components/ui/button";
import { addToCart } from "@/store/cartSlice";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function ProductDetail({ product }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = (productItem) => {
    const addProduct = { ...productItem, quantity };

    dispatch(addToCart(addProduct));

    toast("Sepet", {
      description: productItem.title + " sepete eklendi",
      type: "success",
      style: {
        background: "#333",
        color: "#fff",
      },
    });
  };
  console.log(product);

  return (
    <div className="lg:w-10/12 mx-auto flex flex-col md:flex-row gap-8 p-6 md:p-12">
      <div className="flex-1 flex justify-center items-center">
        <Image
          src={product.image}
          alt={product.title}
          width={300}
          height={300}
          className="object-contain"
        />
      </div>
      <div className="flex-2 flex flex-col gap-4 lg:pr-8">
        <h2 className="text-2xl font-bold">{product.title}</h2>
        <p className="text-muted-foreground">{product.description}</p>
        <div className="flex justify-between gap-4">
          <p className="text-card-foreground">Stok: {product.rating?.count}</p>
          <p className="text-card-foreground">Puan: {product.rating?.rate}</p>
        </div>

        <p className="text-xl font-semibold">Fiyat: ${product.price}</p>

        <p>Adet :</p>
        <div className="flex items-center text-xl gap-4 w-40">
          <Button
            variant="secondary"
            className="w-max"
            onClick={handleDecrease}
          >
            -
          </Button>
          <p>{quantity}</p>
          <Button
            variant="secondary"
            className="w-max"
            onClick={handleIncrease}
          >
            +
          </Button>
        </div>
        <Button
          variant="default"
          className="w-full"
          onClick={() => handleAddToCart(product)}
        >
          Sepete Ekle
        </Button>
      </div>
    </div>
  );
}
