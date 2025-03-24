import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppProvider from "@/providers/AppProvider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "%s | Hyper Store",
    default: "Hyper Store",
  },
  description:
    "Hyper Store bir e-ticaret sitesidir. En iyi ürünleri en uygun fiyatlarla satın alabilirsiniz.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>
          <main className="min-h-screen">
            <Navbar />
            {children}
          </main>
        </AppProvider>
        <Toaster />
      </body>
    </html>
  );
}
