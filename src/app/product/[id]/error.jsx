"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-[300px] flex flex-col items-center justify-center">
      <h2 className="mb-4 text-lg">Üzgünüz bir hata oluştu</h2>
      <div className="flex space-x-4">
        <Button onClick={() => router.back()}>Geri</Button>

        <Button onClick={() => reset()}>Tekrar Dene</Button>
      </div>
    </div>
  );
}
