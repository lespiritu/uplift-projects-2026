interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  containerClassName?: string;
  variant?: "dark" | "light";
}

const Section = ({
  children,
  className = "",
  variant = "dark",
  ...props
}: SectionProps) => {
  const sectionVariantClass =
    variant === "light" ? " bg-light text-background" : "";

  const contentClass = variant === "light" ? "text-text-dark2" : "text-text";

  return (
    <section
      className={`scroll-mt-15 md:scroll-mt-32 border-b pb-8 border-secondary/20 ${sectionVariantClass}`}
      {...props}
    >
      <div
        className={`mx-auto w-full max-w-6xl  px-4  sm:px-6 lg:px-8 ${contentClass} ${className}`}
      >
        {children}
      </div>
    </section>
  );
};

export default Section;
