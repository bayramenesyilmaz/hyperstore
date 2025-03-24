"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { toast } from "sonner";
import Link from "next/link";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = (productItem) => {
    dispatch(addToCart(productItem));

    toast("Sepet", {
      description: productItem.title + " sepete eklendi",
      type: "success",
      style: {
        background: "#333",
        color: "#fff",
      },
    });
  };

  return (
    <Card className="w-full max-h-[360px] rounded-lg overflow-hidden justify-between gap-0 shadow-lgs hover:shadow-xl transition-transform transform hover:scale-102">
      <CardHeader className="relative h-32 md:h-40">
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4">
        <Link href={`/product/${product.id}`} className="hover:underline">
          <h2 className="text-lg font-semibold line-clamp-2 ">
            {product.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            ${product.price.toFixed(2)}
          </p>
        </Link>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => handleAddToCart({ ...product, quantity: 1 })}
        >
          Sepete Ekle
        </Button>
      </CardFooter>
    </Card>
  );
}
