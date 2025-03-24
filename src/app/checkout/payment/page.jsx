import PaymentForm from "@/components/PaymentForm";

export const metadata = {
  title: "Ödeme Yap",
  description: "Ödeme yapma sayfası.",
};

export default function PaymentPage() {
  return (
    <section className="container max-w-2xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Ödeme Yap</h1>

      <PaymentForm />
    </section>
  );
}
