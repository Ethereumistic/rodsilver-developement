"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "./ui/images-slider";

export function ImagesSliderDemo() {
  const images = [
    "https://cdn.jsdelivr.net/gh/Ethereumistic/rodsilver-assets/banner/banner.jpg",
    "https://cdn.jsdelivr.net/gh/Ethereumistic/rodsilver-assets/banner/banner2.jpg",
    "https://cdn.jsdelivr.net/gh/Ethereumistic/rodsilver-assets/banner/banner3.jpg",
    "https://cdn.jsdelivr.net/gh/Ethereumistic/rodsilver-assets/banner/banner4.jpg",
    "https://cdn.jsdelivr.net/gh/Ethereumistic/rodsilver-assets/banner/banner5.jpg",
  ];
  return (
    <ImagesSlider className="h-screen " images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold font-pacifico text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
        Блести с уникалност – твоят стил, твоето бижу! <br /> <span className="text-2xl ">Изискана изработка за всеки специален момент.</span>
        </motion.p>
        <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <span>Пазарувай Сега →</span>
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button>
      </motion.div>
    </ImagesSlider>
  );
}
