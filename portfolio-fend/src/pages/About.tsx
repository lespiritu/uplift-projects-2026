import Section from "../components/Section";
import { motion, type Variants } from "motion/react";
import { BriefcaseBusiness, CodeXml, House, Target } from "lucide-react";
import { FaQuoteRight } from "react-icons/fa6";

const storyParagraphs = [
  "I am a career shifter with over 7 years of freelance experience in design, photo editing, and real estate, where I developed strong discipline, adaptability, and time management skills. My background in working with clients and managing projects independently has shaped my problem-solving mindset and attention to detail.",
  "I recently transitioned into software development after completing a Full Stack Web Development program at Uplift Bootcamp. I am now skilled in building web applications using the MERN stack (MongoDB, Express, React, Node.js), along with modern tools and practices such as REST APIs, responsive design, and version control with Git.",
  "I am passionate about creating clean, user-friendly, and efficient applications. I am currently seeking an opportunity as a Full Stack Developer where I can contribute to real-world projects, collaborate with a team, and continuously improve my technical and professional skills.",
];

const highlightCards = [
  {
    icon: BriefcaseBusiness,
    eyebrow: "Foundation",
    title: "7+ years of freelance",
    text: "Working directly with clients strengthened my communication, consistency, and ability to manage projects independently.",
  },

  {
    icon: House,
    eyebrow: "Experienced",
    title: "Real estate and ads experience",
    text: "My experience as a Freelance Real Estate Agent helped me build strong communication and client-handling skills, while my work with Facebook advertisements strengthened my marketing and audience-targeting abilities.",
  },
  {
    icon: CodeXml,
    eyebrow: "Transition",
    title: "MERN stack training",
    text: "I recently shifted into software development and now build web apps with MongoDB, Express, React, Node.js, REST APIs, Git, and responsive UI practices.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const About = () => {
  return (
    <Section
      id="about"
      className="min-h-screen px-4 py-8 md:px-8"
      variant="dark"
    >
      <motion.div
        className="relative overflow-hidden rounded-lg border border-secondary/20 bg-surface/55 p-6   md:p-8 lg:p-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          variants={itemVariants}
          className="relative mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <p className="mb-3 text-sm uppercase tracking-[0.38em] text-primary">
              About Me
            </p>
            <h1 className="text-4xl leading-tight text-text ">
              From freelance
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-text-light md:text-base">
              A career shift driven by a passion for learning more and building
              meaningful applications in tech.
            </p>
          </div>

          <motion.div
            variants={itemVariants}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="self-start rounded-lg border border-primary/50  border-dashed bg-background/70 px-5 py-4"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-xl border border-primary/25 bg-primary/10 p-3 text-primary">
                <Target size={20} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-primary bg">
                  Current Goal
                </p>
                <p className="mt-1 max-w-xs text-sm leading-6 text-text-light">
                  Land my first role as a Software Engineer and bring my
                  excitement, curiosity, and skills into the tech industry.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] ">
          <motion.div
            variants={itemVariants}
            className="relative self-baseline rounded-lg border-2 border-accent bg-light1-pattern 1 p-5 md:p-12"
          >
            <div className="translate-x-4 -translate-y-4 text-4xl text-surface/70 flex justify-end">
              <FaQuoteRight />
            </div>

            <div className="relative space-y-5 text-xs leading-7 text-text-dark2 md:text-base">
              {storyParagraphs.map((paragraph) => (
                <motion.p key={paragraph} variants={itemVariants}>
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>

          <motion.div variants={containerVariants} className="grid gap-5">
            {highlightCards.map(
              ({ icon: Icon, eyebrow, title, text }, index) => (
                <motion.article
                  key={title}
                  variants={itemVariants}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="group relative overflow-hidden rounded-lg border border-dashed border-secondary/20 p-6 bg-background-light2/10"
                >
                  <div className="relative flex items-start gap-4">
                    <div className="rounded-2xl border border-primary/20 bg-primary/10 p-3 text-primary">
                      <Icon size={24} />
                    </div>

                    <div>
                      <p className="mb-2 text-xs uppercase tracking-[0.28em] text-primary">
                        0{index + 1} • {eyebrow}
                      </p>
                      <h2 className="text-xl leading-snug text-text">
                        {title}
                      </h2>
                      <p className="mt-3 text-sm leading-7 text-text-light">
                        {text}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ),
            )}
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
};

export default About;
