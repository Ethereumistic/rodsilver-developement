import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import { NavbarDemo } from "./components/Navbar";
import { cx } from "@/utils/all";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pacifico',
  display: 'swap',
})

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const paci = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-paci",
  weight: "400",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "RodSilver",
  description: "Кажете чао на вредителите във Вашият дом или работно място!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
    lang="en"
    suppressHydrationWarning
    className={cx(geistSans.variable, geistMono.variable, pacifico.variable, paci.variable)}
  > 

      <Providers>
      <div className="font-pacifico">
      <NavbarDemo />
      </div>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} ${paci.variable}  antialiased`}
      >
        {children}
      </body>
      </Providers>

    </html>
  );
}
