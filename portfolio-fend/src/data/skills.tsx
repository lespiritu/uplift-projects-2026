import { FaHtml5 } from "react-icons/fa6";
import { FaCss3 } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { FaReact } from "react-icons/fa";
import { FaNodeJs } from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { FaGit } from "react-icons/fa";
import { BsTypescript } from "react-icons/bs";
import { TbBrandAdobePhotoshop } from "react-icons/tb";

export const Category = {
  Frontend: "Frontend",
  Backend: "Backend",

  Other: "Other",
} as const;

export type Category = (typeof Category)[keyof typeof Category];

export interface Skill {
  skillName: string;
  skillIcon: React.ElementType;
  level: number; // max 100
  category: Category;
}

const skills: Skill[] = [
  {
    skillName: "HTML",
    skillIcon: FaHtml5,
    level: 90,
    category: Category.Frontend,
  },

  {
    skillName: "CSS",
    skillIcon: FaCss3,
    level: 90,
    category: Category.Frontend,
  },

  {
    skillName: "JavaScript",
    skillIcon: IoLogoJavascript,
    level: 85,
    category: Category.Frontend,
  },

  {
    skillName: "React.js",
    skillIcon: FaReact,
    level: 80,
    category: Category.Frontend,
  },
  {
    skillName: "Node.js",
    skillIcon: FaNodeJs,
    level: 75,
    category: Category.Backend,
  },

  {
    skillName: "Express",
    skillIcon: SiExpress,
    level: 75,
    category: Category.Backend,
  },

  {
    skillName: "MongoDB",
    skillIcon: SiMongodb,
    level: 75,
    category: Category.Backend,
  },

  {
    skillName: "Git",
    skillIcon: FaGit,
    level: 75,
    category: Category.Other,
  },

  {
    skillName: "TypeScript",
    skillIcon: BsTypescript,
    level: 60,
    category: Category.Frontend,
  },

  {
    skillName: "Adobe Photoshop",
    skillIcon: TbBrandAdobePhotoshop,
    level: 90,
    category: Category.Other,
  },
];

export default skills;
