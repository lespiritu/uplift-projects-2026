import profile from "../data/profile";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "GitHub", href: profile.github },
  { label: "GitLab", href: profile.gitlab },
  { label: "LinkedIn", href: profile.linkedin },
].filter((link) => Boolean(link.href));

const Footer = () => {
  return (
    <footer className="border-t border-border/30 bg-surface/40 px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div className="space-y-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary">
              {profile.jobTitle}
            </p>
            <span className="flex items-center gap-2">
              <img className="w-10" src={profile.logo} alt="leoncio logo" />

              <h2 className="my-name-footer mt-3 pt-6 text-5xl text-text ">
                {profile.name}
              </h2>
            </span>
          </div>
          <p className="max-w-md text-sm leading-7 text-text-light">
            Building clean, responsive, and user-focused web applications with
            modern front-end and back-end tools.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm uppercase tracking-[0.25em] text-primary">
            Navigate
          </h3>
          <ul className="space-y-3 text-text-light">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm uppercase tracking-[0.25em] text-primary">
            Connect
          </h3>
          <div className="space-y-3 text-text-light">
            {profile.email ? (
              <a
                href={`mailto:${profile.email}`}
                className="block transition-colors hover:text-primary"
              >
                {profile.email}
              </a>
            ) : null}
            {profile.phone ? <p>{profile.phone}</p> : null}
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="block transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border/20">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 text-sm text-text-light sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© 2026 {profile.name}. All rights reserved.</p>
          <p>Designed and built with React, Vite, and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
