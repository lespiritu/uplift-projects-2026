interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  containerClassName?: string;
  variant?: "dark" | "light";
}

const Section = ({
  children,
  title,
  subtitle,
  className = "",
  containerClassName = "",
  variant = "dark",
  ...props
}: SectionProps) => {
  const sectionVariantClass =
    variant === "light" ? "bg-text text-background" : "bg-background text-text";

  const titleClass = variant === "light" ? "text-background" : "text-text";
  const subtitleClass =
    variant === "light" ? "text-surface-alt" : "text-text-muted";
  const contentClass =
    variant === "light" ? "text-text-dark" : "text-text-light";

  return (
    <section
      className={`px-4 py-12 sm:px-6 lg:px-8 ${sectionVariantClass} ${className}`}
      {...props}
    >
      <div className={`mx-auto w-full max-w-6xl ${containerClassName}`}>
        {title ? (
          <div className="mb-8">
            <h2 className={`text-3xl font-bold ${titleClass}`}>{title}</h2>
            {subtitle ? (
              <p className={`mt-2 max-w-2xl text-sm ${subtitleClass}`}>
                {subtitle}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className={contentClass}>{children}</div>
      </div>
    </section>
  );
};

export default Section;
