"use client";

import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { clearCart, hydrateCart } from "@/store/cartSlice";
import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { useRouter } from "next/navigation";

export default function CartSheet() {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(hydrateCart());
    setIsMounted(true);
  }, [dispatch]);

  const handleRemoveAllCart = () => {
    dispatch(clearCart());
  };

  const handleNavigate = (path) => {
    setOpen(false);
    router.push(path);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <span className="absolute -top-3 -left-1 text-sm w-5.5 h-5.5 bg-blue-500 text-white rounded-2xl ">
            {cartItems.length}
          </span>
          <ShoppingCart className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="gap-1">
        <SheetHeader>
          <SheetTitle>Sepetim</SheetTitle>
          <SheetDescription>
            Sepetinizdeki ürünleri görüntüleyebilir ve siparişi
            tamamlayabilirsiniz.
          </SheetDescription>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <p className="text-center">Sepetiniz boş.</p>
        ) : (
          <div className="p-4 pb-0 flex flex-col space-y-4">
            <Button
              variant="destructive"
              className="w-max self-end"
              onClick={handleRemoveAllCart}
            >
              Sepeti Temizle
            </Button>

            <div className="max-h-[360px] space-y-4 text-center overflow-auto">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  handleNavigate={handleNavigate}
                />
              ))}
            </div>

            <div className="w-full sticky bottom-0 flex justify-between mt-4 pb-4 bg-background">
              <span className="font-bold">
                Toplam: ${totalPrice.toFixed(2)}
              </span>

              <span className="text-sm ">{cartItems.length} Ürün</span>
            </div>
          </div>
        )}
        <SheetFooter className="p-4 border-t">
          <Button onClick={() => handleNavigate("/checkout")}>
            Siparişi Tamamla
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
