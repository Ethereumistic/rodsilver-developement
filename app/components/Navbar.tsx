"use client";
import React, { useState } from "react";
import {  Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import ThemeSwitch from "./themeSwitch";
import Link from "next/link";
import { FlipWordsNav } from "./FlipWordsNav";
import { usePathname } from 'next/navigation';


import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";


export function NavbarDemo({ className }: { className?: string }) {

  const pathname = usePathname();

  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!;
  
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  if (pathname.startsWith('/studio')) return null;


  return (
    <div className="relative w-full flex items-center justify-center ">

<AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,

        }}
        transition={{
          duration: 0.3,
        }}
        className={cn(
          "flex  fixed top-0 inset-x-0 mx-auto rounded-full  bg-transparent  z-[5000]   items-center justify-center space-x-32",
          className
        )}
      >

      <Navbar className="top-0" />

      </motion.div>
      </AnimatePresence>
        
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div>

    <div
      className={cn("fixed top-10  inset-x-0  w-full px-4 md:px-0 md:w-[90%] lg:w-[80%] xl:w-[70%] 2xl:w-[60%] sm:block hidden mx-auto z-50  ", className)}
    >

      <Menu setActive={setActive}>
    <div className="mr-96  ">
      <h1 className="text-4xl font-pacifico text-gray-600 dark:text-white ">RodSilver</h1>
      </div>

        <div className="flex mt-2 space-x-16 text-xl font-bold">
        {/* <MenuItem setActive={setActive} active={active} item="Услуги">
          <div className="grid grid-cols-3 space-y-8 space-x-4 text-sm">
            <div className="translate-x-4 translate-y-8 hover:scale-105 transition duration-300 hover:drop-shadow-[0_1.5px_1.5px_rgba(255,22,22,1)]">
            <HoveredLink href="/web-dev">Контрол на Хлебарки</HoveredLink>
            </div>
            <div className=" hover:scale-105 transition duration-300 hover:drop-shadow-[0_1.5px_1.5px_rgba(255,22,22,1)]">
            <HoveredLink href="/interface-design">Контрол на Дървеници</HoveredLink>
            </div>
            
            <div className=" hover:scale-105 transition duration-300 hover:drop-shadow-[0_1.5px_1.5px_rgba(255,22,22,1)]">
            <HoveredLink href="/seo">Контрол на Гризачи</HoveredLink>
            </div>

            <div className=" hover:scale-105 transition duration-300 hover:drop-shadow-[0_1.5px_1.5px_rgba(255,22,22,1)]">
            <HoveredLink href="/branding">Контрол на Мравки</HoveredLink>
            </div>

            <div className=" hover:scale-105 transition duration-300 hover:drop-shadow-[0_1.5px_1.5px_rgba(255,22,22,1)]">
            <HoveredLink href="/branding">Контрол на Оси и Стършели</HoveredLink>
            </div>

            <div className=" hover:scale-105 transition duration-300 hover:drop-shadow-[0_1.5px_1.5px_rgba(255,22,22,1)]">
            <HoveredLink href="/branding">Контрол на Мравки</HoveredLink>
            </div>

            <div className=" hover:scale-105 transition duration-300 hover:drop-shadow-[0_1.5px_1.5px_rgba(255,22,22,1)]">
            <HoveredLink href="/branding">Контрол на Комари и Кърлежи</HoveredLink>
            </div>

            <div className=" hover:scale-105 transition duration-300 hover:drop-shadow-[0_1.5px_1.5px_rgba(255,22,22,1)]">
            <HoveredLink href="/branding">Контрол на Бълхи</HoveredLink>
            </div>

            <div className=" hover:scale-105 transition duration-300 hover:drop-shadow-[0_1.5px_1.5px_rgba(255,22,22,1)]">
            <HoveredLink href="/branding">Контрол на Влечуги и Къртици</HoveredLink>
            </div>

            <div className=" hover:scale-105 transition duration-300 hover:drop-shadow-[0_1.5px_1.5px_rgba(255,22,22,1)]">
            <HoveredLink href="/branding">Контрол на Нежелани Миризми</HoveredLink>
            </div>

            <div className=" hover:scale-105 transition duration-300 hover:drop-shadow-[0_1.5px_1.5px_rgba(255,22,22,1)]">
            <HoveredLink href="/branding">Защита от Нежелани Птици</HoveredLink>
            </div>

            <div className=" hover:scale-105 transition duration-300 hover:drop-shadow-[0_1.2px_1.2px_rgba(57,255,20,1)]">
            <HoveredLink href="/disinfection">Професионална Дезинфекция</HoveredLink>
            </div>

          </div>
        </MenuItem> */}
        <Link href="/pests">
        <MenuItem setActive={setActive} active={active} item="Услуги">
        <div className="flex justify-center items-center my-4"><FlipWordsNav /></div>

          <div className=" text-sm grid grid-cols-3 gap-10 p-4 ">
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
        </Link>
        {/* <MenuItem setActive={setActive} active={active} item="Pricing">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">Hobby</HoveredLink>
            <HoveredLink href="/individual">Individual</HoveredLink>
            <HoveredLink href="/team">Team</HoveredLink>
            <HoveredLink href="/enterprise">Enterprise</HoveredLink>
          </div>
        </MenuItem> */}
        </div>
        <Link href="/contact"
              className="">
        </Link>
        <ThemeSwitch />

      </Menu>
    </div>
    </div>
  );
}
