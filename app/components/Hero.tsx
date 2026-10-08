import React from "react";
import Image from "next/image";
import Link from "next/link";
import { socials } from "../utils";
import { Social } from "@/types";

const Hero = () => {
  return (
    <header className="flex flex-col gap-8 text-white">
      <Image
        src="/profile.png"
        alt="Adéolúwa Abraham Adéyẹmí"
        width={56}
        height={56}
        className="rise rounded-full ring-1 ring-white/10 grayscale transition-all duration-500 hover:scale-105 hover:grayscale-0 hover:ring-white/30"
      />
      <div
        className="rise flex flex-col gap-2"
        style={{ animationDelay: "80ms" }}
      >
        <h1 className="text-3xl font-semibold tracking-[-0.03em] sm:text-[2.6rem] sm:leading-[1.1]">
          Adéolúwa Abraham Adéyẹmí
        </h1>
        <p className="text-[#949495]">Software Engineer · Lagos, Nigeria</p>
      </div>
      <p
        className="rise max-w-xl text-[15px] leading-relaxed text-[#b4b4b8]"
        style={{ animationDelay: "160ms" }}
      >
        I design and ship web and mobile applications, backend systems and the
        cloud infrastructure they run on, with a focus on performance,
        reliability and clear collaboration. Currently building revenue
        platforms at Etranzact and leading product engineering at Synctech
        Innovations.
      </p>
      <div
        className="rise flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#949495]"
        style={{ animationDelay: "240ms" }}
      >
        <Link
          href="mailto:engraaadeyemi@gmail.com"
          className="press text-white underline underline-offset-4 decoration-white/30 transition-colors hover:decoration-white"
        >
          Email
        </Link>
        {socials.map((social: Social) => (
          <Link
            key={social.id}
            href={social.url}
            target="_blank"
            className="link-line press capitalize hover:text-white"
          >
            {social.name}
          </Link>
        ))}
        <Link
          href="https://calendly.com/engraaadeyemi/30min?month=2024-07"
          target="_blank"
          className="link-line press hover:text-white"
        >
          Book a call
        </Link>
      </div>
    </header>
  );
};

export default Hero;
