import Section from "../components/Section";
import Button from "../components/Button";
import profile from "../data/profile";
import { FaFacebook, FaGithub, FaGitlab, FaLinkedin } from "react-icons/fa";
import { VscSend } from "react-icons/vsc";
import { motion, type Variants } from "motion/react";

const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const panelVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.12 + index * 0.16,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const Contact = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const subject = encodeURIComponent(
      `Portfolio inquiry from ${name || "Guest"}`,
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    );

    const mailtoUrl = `mailto:${profile.email ?? ""}?subject=${subject}&body=${body}`;

    window.open(mailtoUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Section id="contact" className="min-h-screen px-8" variant="dark">
      <motion.div
        className="py-8"
        variants={contentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className="mb-10 max-w-2xl" variants={contentVariants}>
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-primary">
            Contact
          </p>
          <h1 className="text-4xl text-text md:text-5xl">Let&apos;s Talk</h1>
          <p className="mt-4 text-text-light max-w-md">
            Have a project in mind or want to work together? Send me a message
            and I&apos;ll get back to you.
          </p>
        </motion.div>

        <div className="md:flex md:gap-12">
          <motion.form
            onSubmit={handleSubmit}
            className=" flex-1 grid gap-5 rounded-lg border border-accent/20 bg-secondary/20 p-6 md:p-8"
            variants={panelVariants}
            custom={0}
          >
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm text-text-light">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                className="rounded border border-border/50 bg-background/90 px-4 py-3 text-text outline-none transition-colors placeholder:text-text-dark2/70 focus:border-primary"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm text-text-light">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                className="rounded border border-border/50 bg-background/90 px-4 py-3 text-text outline-none transition-colors placeholder:text-text-dark2/70 focus:border-primary"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="message" className="text-sm text-text-light">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="Write your message here..."
                className="resize-none rounded border border-border/50 bg-background/90 px-4 py-3 text-text outline-none transition-colors placeholder:text-text-dark2/70 focus:border-primary"
              />
            </div>

            <Button
              type="submit"
              variant="outline"
              className=" self-start justify-self-start w-auto"
            >
              <span className="flex gap-2 items-center">
                <VscSend />
                Send Message
              </span>
            </Button>
          </motion.form>

          <motion.div
            id="social-links"
            className="mt-8 flex-1 md:mt-0"
            variants={panelVariants}
            custom={1}
          >
            <div className="rounded-lg border border-accent/20 bg-secondary/20 p-6 md:p-8">
              <p className="mb-4 text-sm uppercase tracking-[0.35em] text-primary">
                Social Links
              </p>

              <div className="flex flex-col gap-4">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded border border-border/40 bg-background/70 px-4 py-3 text-text-light transition-colors hover:border-primary hover:text-primary"
                >
                  <FaLinkedin className="text-xl" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded border border-border/40 bg-background/70 px-4 py-3 text-text-light transition-colors hover:border-primary hover:text-primary"
                >
                  <FaGithub className="text-xl" />
                  <span>GitHub</span>
                </a>

                <a
                  href={profile.gitlab}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded border border-border/40 bg-background/70 px-4 py-3 text-text-light transition-colors hover:border-primary hover:text-primary"
                >
                  <FaGitlab className="text-xl" />
                  <span>GitLab</span>
                </a>

                <a
                  href={profile.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded border border-border/40 bg-background/70 px-4 py-3 text-text-light transition-colors hover:border-primary hover:text-primary"
                >
                  <FaFacebook className="text-xl" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
};

export default Contact;
