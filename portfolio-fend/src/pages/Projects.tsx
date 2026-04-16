import Section from "../components/Section";
import projects from "../data/projects";
import { FaGitlab } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";
import { motion, type Variants } from "motion/react";

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: (index: number) => ({
    opacity: 1,

    transition: {
      delay: index * 0.4,
      duration: 0.5,
      ease: [1, 0.4, 0.4, 1],
    },
  }),
};

const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.18,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Projects = () => {
  const displayProjects = [...projects].reverse().map((project, index) => (
    <motion.div
      key={project.id}
      className="h-full transition-all duration-300 ease-in-out"
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div
        id="card-project"
        className="group relative h-full min-h-80 overflow-hidden rounded-4xl border border-dashed border-accent bg-text-dark2/70 "
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70 transition-opacity md:group-hover:opacity-50"
          style={{
            backgroundImage: `url(${project.image})`,
          }}
        ></div>
        <motion.div
          className="relative z-10 flex h-full w-full flex-col items-start gap-4 border border-secondary bg-light1-pattern p-2 opacity-100 md:-translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-in-out"
          variants={contentVariants}
        >
          <div className=" p-6 rounded-2xl">
            <div className="flex gap-2 text-xl text-text-dark2 justify-end">
              {project.gitlabLink && (
                <a
                  href={project.gitlabLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  <FaGitlab />
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  <FaGithub />
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  <FaExternalLinkAlt />
                </a>
              )}
            </div>
            <h2 className="text-lg font-semibold text-text-dark2 pb-3">
              {project.name}
            </h2>
            <p className="text-sm text-text-dark2">{project.description}</p>
            <div>
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-block rounded-full bg-primary/70 px-3 py-1 text-xs text-text-dark2 mr-2 mt-2"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  ));
  return (
    <Section id="projects" className="min-h-screen px-8 " variant="dark">
      <div className="py-8">
        <h1 className="text-4xl tracking-widest text-primary pb-2">Projects</h1>
        <p className="text-text-light max-w-2xl">
          Here are some of the projects I've worked on recently.
        </p>
      </div>
      <motion.div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {displayProjects}
      </motion.div>
    </Section>
  );
};

export default Projects;
