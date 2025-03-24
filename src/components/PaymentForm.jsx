"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SmsVerificationDialog from "./SmsVerificationDialog";
import LoadingSpinner from "./Loading";

export default function PaymentForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    paymentMethod: "creditCard",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [smsCode, setSmsCode] = useState("");
  const [sentCode, setSentCode] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendFakeSms = () => {
    const fakeCode = Math.floor(100000 + Math.random() * 900000).toString();
    setSentCode(fakeCode);
    toast.success(`Doğrulama kodu gönderildi: ${fakeCode}`, {
      style: {
        backgroundColor: "#4caf50",
        color: "#ffffff",
      },
    });
  };

  const handlePayment = () => {
    sendFakeSms();
    setIsDialogOpen(true);
  };

  const validateForm = () => {
    const requiredFields = ["name", "address", "phone"];
    if (formData.paymentMethod === "creditCard") {
      requiredFields.push("cardNumber", "expiryDate", "cvv");
    }

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error("Lütfen tüm alanları doldurun.", {
          style: {
            backgroundColor: "#f44336",
            color: "#ffffff",
          },
        });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    handlePayment();
  };

  return (
    <div className="space-y-6">
      <Input
        name="name"
        placeholder="Ad Soyad"
        value={formData.name}
        onChange={handleChange}
      />

      <Input
        name="address"
        placeholder="Adres"
        value={formData.address}
        onChange={handleChange}
      />

      <Input
        name="phone"
        placeholder="Telefon Numarası"
        value={formData.phone}
        onChange={handleChange}
      />

      <div>
        <h2 className="text-lg font-semibold">Ödeme Yöntemi:</h2>
        <div className="flex space-x-4 mt-4">
          <Button
            variant={
              formData.paymentMethod === "creditCard" ? "default" : "outline"
            }
            onClick={() =>
              handleChange({
                target: { name: "paymentMethod", value: "creditCard" },
              })
            }
          >
            Kredi Kartı
          </Button>
          <Button
            variant={formData.paymentMethod === "cash" ? "default" : "outline"}
            onClick={() =>
              handleChange({ target: { name: "paymentMethod", value: "cash" } })
            }
          >
            Kapıda Ödeme
          </Button>
        </div>
      </div>

      {formData.paymentMethod === "creditCard" && (
        <div className="space-y-2">
          <Input
            name="cardNumber"
            placeholder="Kart Numarası"
            value={formData.cardNumber}
            onChange={handleChange}
          />
          <Input
            name="expiryDate"
            placeholder="Son Kullanma Tarihi (AA/YY)"
            value={formData.expiryDate}
            onChange={handleChange}
          />
          <Input
            name="cvv"
            placeholder="CVV"
            value={formData.cvv}
            onChange={handleChange}
          />
        </div>
      )}

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={() => router.push("/checkout")}>
          Geri Dön
        </Button>
        <Button onClick={handleSubmit}>Ödeme Yap</Button>
      </div>

      <SmsVerificationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        sentCode={sentCode}
        smsCode={smsCode}
        setSmsCode={setSmsCode}
        setLoading={setLoading}
        resendCode={sendFakeSms}
      />

      {loading && <LoadingSpinner />}
    </div>
  );
}
