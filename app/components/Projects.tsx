import React from "react";
import { projects } from "../utils";
import { Project, Skill, Url } from "@/types";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import Reveal from "./Reveal";

const Projects: React.FC = () => {
  return (
    <section id="projects" className="flex scroll-mt-28 flex-col gap-10">
      <Reveal>
        <h2 className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.25em] text-[#6b6b6e]">
          <span>01</span>
          <span className="h-px w-8 bg-[#3f3f46]" />
          <span>Selected work</span>
        </h2>
      </Reveal>
      <div className="group/list flex flex-col [&>div:first-child>article]:border-t-0 [&>div:first-child>article]:pt-0">
        {projects.map((project: Project) => {
          const { id, name, description, skills, isMaintaining, urls } =
            project;
          return (
            <Reveal key={id}>
              <article className="flex flex-col gap-3 border-t border-white/10 py-8 transition-opacity duration-300 md:group-hover/list:opacity-40 md:hover:!opacity-100">
                <div className="flex items-baseline justify-between gap-6">
                  <Link
                    href={urls[0].url}
                    target="_blank"
                    className="group flex items-center gap-1.5 text-lg font-medium text-white"
                  >
                    {name}
                    <FiArrowUpRight className="text-[#6b6b6e] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  </Link>
                  {isMaintaining && (
                    <span className="text-[11px] text-[#6b6b6e]">
                      In maintenance
                    </span>
                  )}
                </div>
                <p className="max-w-xl text-sm leading-relaxed text-[#949495]">
                  {description}
                </p>
                <p className="text-xs text-[#6b6b6e]">
                  {skills.map((skill: Skill) => skill.label).join(" · ")}
                </p>
                {urls.length > 1 && (
                  <div className="flex gap-5 pt-1 text-xs text-[#949495]">
                    {urls.map((url: Url) => (
                      <Link
                        key={url.id}
                        href={url.url}
                        target="_blank"
                        className="capitalize transition-colors hover:text-white"
                      >
                        {url.name}
                      </Link>
                    ))}
                  </div>
                )}
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
