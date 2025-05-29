import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";
import "../../globals.css";
import { Poppins } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import { AppSidebar } from "@/components/app-sidebar";
import Providers from "@/app/providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Smart Stack",
  description:
    "A Place where you can track analyze and manage your store stocks.",
};
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${poppins.className}`}>
        <NextIntlClientProvider>
          <Providers>
            <AppSidebar />
            <div className="flex flex-col w-full">
              <Navbar />
              <main className="flex">{children}</main>
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
