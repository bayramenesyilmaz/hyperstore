"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const categories = [
  { key: "all", label: "Tüm Ürünler" },
  { key: "men's clothing", label: "Erkek Giyim" },
  { key: "women's clothing", label: "Kadın Giyim" },
  { key: "electronics", label: "Elektronik" },
  { key: "jewelery", label: "Mücevher" },
];

export default function CategoryFilter({ currentCategory }) {
  const router = useRouter();

  const handleChange = (e) => {
    const selected = e;
    router.push(`/?category=${selected}`);
  };

  return (
    <Select onValueChange={handleChange} value={currentCategory}>
      <SelectTrigger className="w-[180px] hover:cursor-pointer">
        <SelectValue placeholder="Kategori Seç" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Kategoriler</SelectLabel>
          {categories.map(({ key, label }) => (
            <SelectItem key={key} value={key} className="hover:cursor-pointer">
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
