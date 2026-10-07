import React from "react";
import Link from "next/link";
import Reveal from "./Reveal";

const Footer = () => {
  return (
    <footer
      id="contact"
      className="scroll-mt-28 border-t border-white/10 pt-10"
    >
      <Reveal className="flex flex-col gap-4">
        <p className="text-2xl font-semibold tracking-[-0.02em] text-white">
          Let&apos;s work together.
        </p>
        <p className="text-sm text-[#949495]">
          Open to new roles and interesting projects.
        </p>
        <Link
          href="mailto:engraaadeyemi@gmail.com"
          className="w-max text-sm text-white underline underline-offset-4 decoration-white/30 transition-colors hover:decoration-white"
        >
          engraaadeyemi@gmail.com
        </Link>
        <p className="mt-8 text-xs text-[#52525b]">
          © {new Date().getFullYear()} Adéolúwa Abraham Adéyẹmí
        </p>
      </Reveal>
    </footer>
  );
};

export default Footer;
