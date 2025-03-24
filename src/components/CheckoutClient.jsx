"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/store/cartSlice";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/Loading";
import { useRouter } from "next/navigation";

const CartItem = lazy(() => import("@/components/CartItem"));

export default function CheckoutClient() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [dispatch]);

  const handleRemoveAllCart = () => {
    dispatch(clearCart());
  };

  const handleNavigate = (path) => {
    router.push(path);
  };

  if (!isMounted) {
    return null;
  }

  if (cartItems.length === 0) {
    return (
      <div className=" p-8 flex flex-col space-y-4 items-center">
        <p className="text-center mt-10">Sepetiniz boş.</p>
        <Button asChild>
          <Link href="/">Alışverişe devam et</Link>
        </Button>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Siparişi Tamamla</h1>

      <div className="space-y-4 max-h-[360px] overflow-auto">
        <Suspense fallback={<LoadingSpinner />}>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              handleNavigate={handleNavigate}
            />
          ))}
        </Suspense>
      </div>

      <div className="flex space-x-2 mt-8 font-semibold">
        <span>Toplam Tutar:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>

      <div className="flex justify-between mt-8">
        <Button onClick={handleRemoveAllCart} variant="destructive">
          Sepeti Temizle
        </Button>
        <Button asChild>
          <Link href="/checkout/payment">Ödeme Yap</Link>
        </Button>
      </div>
    </section>
  );
}
