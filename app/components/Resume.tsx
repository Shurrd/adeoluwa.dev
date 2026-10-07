import React from "react";
import { experiences, technologies } from "../utils";
import { Descriptions, Experiences, Technologies } from "@/types";
import { FiPlus } from "react-icons/fi";
import Reveal from "./Reveal";

const Heading = ({
  index,
  children,
}: {
  index: string;
  children: React.ReactNode;
}) => (
  <h2 className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.25em] text-[#6b6b6e]">
    <span>{index}</span>
    <span className="h-px w-8 bg-[#3f3f46]" />
    <span>{children}</span>
  </h2>
);

const Resume = () => {
  return (
    <section id="resume" className="flex scroll-mt-28 flex-col gap-20">
      <div className="flex flex-col gap-10">
        <Reveal>
          <Heading index="02">Experience</Heading>
        </Reveal>
        <div className="flex flex-col [&>div:first-child>details]:border-t-0">
          {experiences.map((experience: Experiences, index: number) => {
            const { id, company, title, date, descriptions } = experience;
            return (
              <Reveal key={id}>
                <details
                  open={index === 0}
                  className="group border-t border-white/10"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 transition-colors [&:hover_p:first-of-type]:text-white [&::-webkit-details-marker]:hidden">
                    <div className="flex flex-col gap-1 sm:flex-row sm:gap-8">
                      <span className="w-40 shrink-0 text-xs leading-6 tabular-nums text-[#6b6b6e]">
                        {date}
                      </span>
                      <div>
                        <p className="font-medium text-white">{title}</p>
                        <p className="text-sm text-[#949495]">{company}</p>
                      </div>
                    </div>
                    <FiPlus className="mt-1 shrink-0 text-[#6b6b6e] transition-transform duration-200 group-open:rotate-45" />
                  </summary>
                  <ul className="mb-8 flex list-disc flex-col gap-2.5 pl-4 text-sm leading-relaxed text-[#949495] marker:text-[#52525b] sm:ml-48">
                    {descriptions.map((item: Descriptions) => (
                      <li key={item.id}>{item.description}</li>
                    ))}
                  </ul>
                </details>
              </Reveal>
            );
          })}
        </div>
      </div>

      <Reveal className="flex flex-col gap-6">
        <Heading index="03">Skills</Heading>
        <p className="text-sm capitalize leading-loose text-[#949495]">
          {technologies
            .map((technology: Technologies) => technology.name)
            .join(" · ")}
        </p>
      </Reveal>
    </section>
  );
};

export default Resume;
