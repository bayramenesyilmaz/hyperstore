import ThemeToggle from "./ThemeToggle";
import CartSheet from "./CartSheet";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-accent flex justify-between items-center px-6 py-4 border-b ">
      <Link href="/">
        <h1 className="text-2xl font-bold tracking-wide">Hyper Store</h1>
      </Link>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <CartSheet />
      </div>
    </nav>
  );
}
