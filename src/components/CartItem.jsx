"use client";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/store/cartSlice";
import { toast } from "sonner";
import Image from "next/image";

export default function CartItem({ item, handleNavigate }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));

    toast("Ürün sepetinizden silindi.", {
      type: "success",
      style: {
        background: "#228B22",
        color: "#fff",
      },
    });
  };

  const onNavigate = (path) => {
    // setOpen(false);
    // router.push(path);
    handleNavigate(path);
  };

  return (
    <div
      key={item.id}
      className="w-full flex justify-between border-b pb-2 mb-2"
    >
      <Image
        src={item.image}
        alt={item.title}
        width={40}
        height={40}
        className="object-contain mr-4"
      />
      <div
        className="flex flex-col flex-1 text-left hover:underline hover:cursor-pointer"
        onClick={() => onNavigate(`/product/${item.id}`)}
      >
        <span className="font-semibold line-clamp-1">{item.title}</span>
        <span className="text-sm">
          ${item.price} x {item.quantity}
        </span>
      </div>

      <Button variant="link" onClick={handleRemove}>
        Sil
      </Button>
    </div>
  );
}
