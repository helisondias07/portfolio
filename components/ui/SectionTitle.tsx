type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  titleClassName,
  descriptionClassName,
}: SectionTitleProps) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="text-xs font-bold uppercase tracking-wide text-[#0a66c2] dark:text-[#70b5f9]">
        {eyebrow}
      </p>
      <h2
        className={
          titleClassName ??
          "mt-3 font-display text-2xl font-bold leading-tight text-zinc-950 dark:text-white sm:text-3xl lg:text-4xl"
        }
      >
        {title}
      </h2>
      {description ? (
        <p
          className={
            descriptionClassName ??
            "mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base"
          }
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
