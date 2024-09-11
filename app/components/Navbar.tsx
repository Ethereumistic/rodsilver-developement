"use client";
import React, { useState } from "react";
import { Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import ThemeSwitch from "./themeSwitch";
import Link from "next/link";
import { FlipWordsNav } from "./FlipWordsNav";
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { IconShoppingCart } from "@tabler/icons-react";
import { useStateContext } from "@/context/StateContext";
import CartWrapper from "./CartWrapper";

export function NavbarDemo({ className }: { className?: string }) {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  if (pathname.startsWith('/studio')) return null;

  return (
    <>
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 inset-x-0 z-[5000]"
      >
        <Navbar className="top-10" />
      </motion.div>
    </AnimatePresence>
    <CartWrapper />
    </>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const { setShowCart } = useStateContext();
  return (
    <div className={cn("w-full px-4 sm:px-6 lg:px-8", className)}>
      <div className="max-w-7xl mx-auto">
        <Menu setActive={setActive}>
          <Link href="/" className="flex-shrink-0 ml-4">
            <h1 className="text-4xl font-pacifico text-white hover:scale-105 transition-all duration-300 hover:-rotate-1">
              RodSilver
            </h1>
          </Link>
          <div className="flex items-center space-x-16">
            <MenuItem setActive={setActive} active={active} item="Колекции">
              <div className="flex justify-center items-center my-4">
                <FlipWordsNav />
              </div>
              <div className="text-sm grid grid-cols-3 gap-10 p-4">
              <ProductItem
              title="Обеци"
              href="/pests/cockroach"
              src="https://cdn.jsdelivr.net/gh/Ethereumistic/rodsilver-assets/nav/obeci.png"
              darkSrc="https://cdn.jsdelivr.net/gh/Ethereumistic/rodsilver-assets/nav/obeci.png"
              description="Сбогом на мръсните хлебарки, които разпространяват болести!"
            />
            <ProductItem
              title="Пръстени"
              href="/pests/rat"
              src="https://cdn.jsdelivr.net/gh/Ethereumistic/rodsilver-assets/nav/prusten.png"
              darkSrc="https://cdn.jsdelivr.net/gh/Ethereumistic/rodsilver-assets/nav/prusten.png"
              description="Чао на досадните гризачи, които унищожават вашата храна и имущество!"
            />
            <ProductItem
              title="Огърлици"
              href="/pests/bedbug"
              src="https://cdn.jsdelivr.net/gh/Ethereumistic/rodsilver-assets/nav/gerdan.png"
              darkSrc="https://cdn.jsdelivr.net/gh/Ethereumistic/rodsilver-assets/nav/gerdan.png"
              description="Прогонете досадните дървеници, които ви пречат да спите спокойно!"
            />
            <ProductItem
              title="Гривни"
              href="/pests/flea"
              src="https://cdn.jsdelivr.net/gh/Ethereumistic/rodsilver-assets/nav/grivna.png"
              darkSrc="https://cdn.jsdelivr.net/gh/Ethereumistic/rodsilver-assets/nav/grivna.png"

              description="Без бълхи и сърбежи за Вас и Вашите домашни любимци!"
            />
            <ProductItem
              title="Висулки"
              href="/pests/fly"
              src="https://cdn.jsdelivr.net/gh/Ethereumistic/rodsilver-assets/nav/visulka.png"
              darkSrc="https://cdn.jsdelivr.net/gh/Ethereumistic/rodsilver-assets/nav/visulka.png"

              description="Сложете край на досадните мухи, които пренасят зарази!"
            />
            <ProductItem
              title="Медальони"
              href="/pests/wasp"
              src="https://cdn.jsdelivr.net/gh/Ethereumistic/rodsilver-assets/nav/medalion.png"
              darkSrc="https://cdn.jsdelivr.net/gh/Ethereumistic/rodsilver-assets/nav/medalion.png"

              description="Защитете се от оси, които могат да бъдат опасни!"
            />
              </div>
            </MenuItem>

            <button onClick={() => setShowCart(true)}>
            <h1 className="text-5xl font-pacifico text-white h">
              <IconShoppingCart className="w-8 h-8" />
            </h1>
            </button>
            
            <ThemeSwitch />
          </div>
        </Menu>
      </div>
    </div>
  );
}