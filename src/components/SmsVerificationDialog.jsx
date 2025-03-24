"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { clearCart } from "@/store/cartSlice";
import { useRouter } from "next/navigation";

export default function SmsVerificationDialog({
  isOpen,
  onClose,
  smsCode,
  setSmsCode,
  sentCode,
  setLoading,
  resendCode,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(180);

  useEffect(() => {
    let countdown;

    if (isOpen) {
      setTimer(180);
    }

    if (isOpen && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(countdown);
  }, [isOpen]);

  const handleResend = () => {
    resendCode();
    setTimer(180);
  };

  const handleSmsVerification = () => {
    if (smsCode === sentCode) {
      setLoading(true);

      dispatch(clearCart());

      setTimeout(() => {
        setLoading(false);
        toast.success("Ödeme başarılı! Siparişiniz alındı.", {
          style: {
            backgroundColor: "#4caf50",
            color: "#ffffff",
          },
        });
        router.push("/checkout");
      }, 3000);
    } else {
      toast.error("Geçersiz doğrulama kodu.", {
        style: {
          backgroundColor: "#f44336",
          color: "#ffffff",
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>SMS Doğrulama</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Doğrulama Kodu"
          value={smsCode}
          onChange={(e) => setSmsCode(e.target.value)}
        />

        <p className="text-sm text-gray-500">
          {timer > 0
            ? `Kodun süresi: ${Math.floor(timer / 60)}:${(timer % 60)
                .toString()
                .padStart(2, "0")}`
            : "Kodun süresi doldu."}
        </p>

        {timer <= 0 && (
          <Button variant="outline" onClick={handleResend}>
            Tekrar Gönder
          </Button>
        )}

        <Button onClick={handleSmsVerification}>Doğrula</Button>
      </DialogContent>
    </Dialog>
  );
}
