import Section from "../components/Section";
import skills from "../data/skills";

const Skills = () => {
  const categories = ["Frontend", "Backend", "Other"] as const;

  return (
    <Section id="skills" className="min-h-screen px-8 py-8" variant="dark">
      <div className="mb-10 max-w-2xl">
        <p className="mb-3 text-sm uppercase tracking-[0.35em] text-primary">
          Skills
        </p>
        <h1 className="text-4xl text-text md:text-5xl">Tech Stack & Tools</h1>
        <p className="mt-4 text-text-light">
          A mix of front-end, back-end, and creative tools I use to build
          responsive, functional, and user-focused digital products.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {categories.map((category) => {
          const groupedSkills = skills.filter(
            (skill) => skill.category === category,
          );

          return (
            <div
              key={category}
              className="rounded-2xl border border-border/30 bg-surface/40 p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl text-text">{category}</h2>
                <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-primary">
                  {groupedSkills.length} Skills
                </span>
              </div>

              <div className="space-y-4">
                {groupedSkills.map((skill) => {
                  const Icon = skill.skillIcon;

                  return (
                    <div
                      key={skill.skillName}
                      className="rounded-xl border border-border/20 bg-background/60 p-4"
                    >
                      <div className="mb-3 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg border border-primary/20 bg-primary/10 p-3 text-xl text-primary">
                            <Icon />
                          </div>
                          <div>
                            <p className="text-base text-text">
                              {skill.skillName}
                            </p>
                          </div>
                        </div>

                        <span className="text-sm text-text-light">
                          {skill.level}%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-surface-alt">
                        <div
                          className="h-full rounded-full bg-linear-to-r from-primary to-secondary"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default Skills;
