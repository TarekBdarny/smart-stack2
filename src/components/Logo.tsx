import React from "react";
import { Roboto } from "next/font/google";
const roboto = Roboto({ weight: "400", subsets: ["latin"] });
const Logo = () => {
  return (
    <div
      className={`text-2xl lg:text-3xl ${roboto.className} font-bold mx-auto`}
    >
      Smart <span className="text-primary font-bold">Stack</span>
    </div>
  );
};

export default Logo;
