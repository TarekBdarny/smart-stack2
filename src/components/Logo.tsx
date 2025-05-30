import React from "react";
import { Roboto } from "next/font/google";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
const roboto = Roboto({ weight: "400", subsets: ["latin"] });
const Logo = () => {
  return (
    <Link
      href="/"
      className={`text-2xl lg:text-3xl ${roboto.className} font-bold mx-auto flex items-center gap-2`}
    >
      Smart <span className="text-primary font-bold">Stock</span>
      <GalleryVerticalEnd />
    </Link>
  );
};

export default Logo;
