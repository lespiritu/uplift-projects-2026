import Section from "../components/Section";
import projects from "../data/projects";
import { FaGitlab } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";

const Projects = () => {
  const displayProjects = projects.map((project) => (
    <div
      key={project.id}
      className="h-full  transition-all duration-300 ease-in-out"
    >
      <div
        id="card-project"
        className="group relative h-full min-h-80 overflow-hidden rounded-xl border border-secondary/10 bg-primary"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70 transition-opacity md:group-hover:opacity-50"
          style={{
            backgroundImage: `url(${project.image})`,
          }}
        ></div>
        <div className="relative z-10 flex h-full w-full flex-col items-start gap-4  border border-secondary bg-white/92 p-2 opacity-100    md:-translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-in-out">
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
        </div>
      </div>
    </div>
  ));
  return (
    <Section id="projects" className="min-h-screen px-8 " variant="dark">
      <div className="py-8">
        <h1 className="text-4xl tracking-widest text-primary pb-2">Projects</h1>
        <p className="text-text-light max-w-2xl">
          Here are some of the projects I've worked on recently.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {displayProjects}
      </div>
    </Section>
  );
};

export default Projects;
