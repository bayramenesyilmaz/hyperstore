import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="p-12 flex flex-col items-center justify-center ">
      <div className="text-center">
        <h1 className="text-7xl font-bold ">404</h1>
        <h2 className="mt-4 text-3xl font-semibold">Sayfa Bulunamadı</h2>
        <p className="mt-2 text-lg ">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>

        <Button asChild>
          <Link
            href="/"
            className="mt-6 inline-block rounded-lg transition-transform hover:scale-105"
          >
            Ana Sayfaya Dön
          </Link>
        </Button>
      </div>
    </div>
  );
}
