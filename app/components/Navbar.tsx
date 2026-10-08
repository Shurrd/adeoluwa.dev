"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const links = [
  { id: 1, name: "Work", url: "#projects" },
  { id: 2, name: "Experience", url: "#resume" },
  { id: 3, name: "Contact", url: "#contact" },
];

const Navbar = () => {
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const probe = window.scrollY + window.innerHeight * 0.35;
      let current = "";
      for (const { url } of links) {
        const el = document.querySelector<HTMLElement>(url);
        if (el && el.offsetTop <= probe) current = url;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed left-0 top-3 z-30 w-full px-4">
      <div className="glass mx-auto flex max-w-2xl items-center justify-between rounded-full px-5 py-2.5">
        <Link
          href="/"
          aria-label="Home"
          className="transition-transform duration-300 hover:rotate-6 hover:scale-110 active:scale-95 motion-reduce:transition-none motion-reduce:hover:transform-none"
        >
          <Image src="/logo.svg" alt="logo" width={30} height={30} />
        </Link>
        <div className="flex items-center gap-6 text-xs">
          {links.map(({ id, name, url }) => (
            <Link
              key={id}
              href={url}
              className={`link-line press hover:text-white ${
                active === url ? "text-white" : "text-[#6b6b6e]"
              }`}
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
