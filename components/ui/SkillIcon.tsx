import type { Skill } from "@/data/skills";

type SkillIconProps = Skill & {
  variant?: "tile" | "pill";
};

export function SkillIcon({ name, icon, badgeColor, variant = "tile" }: SkillIconProps) {
  const fill = `#${badgeColor ?? "0A66C2"}`;
  const iconClassName =
    variant === "pill"
      ? "h-4 w-4 text-[#0a66c2] dark:text-[#70b5f9]"
      : "h-12 w-12 text-[#0a66c2] transition-transform group-hover:scale-110 sm:h-7 sm:w-7 dark:text-[#70b5f9]";
  const fallbackClassName =
    variant === "pill"
      ? "grid h-6 w-6 place-items-center rounded text-[0.6rem] font-bold text-white"
      : "grid h-14 w-14 place-items-center rounded-md text-sm font-bold text-white sm:h-8 sm:w-8 sm:text-xs";

  if (variant === "pill") {
    return (
      <div className="inline-flex min-h-9 cursor-default items-center gap-2 rounded-md border border-[#dfdeda] bg-[#f4f2ee] px-3 text-sm font-semibold text-zinc-700 transition hover:border-[#b4d6f5] hover:bg-[#e8f3ff] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-[#0a66c2] dark:hover:bg-[#0a66c2]/10">
        {icon ? (
          <svg
            role="img"
            viewBox="0 0 24 24"
            className={iconClassName}
            style={{ fill: "currentColor" }}
            aria-label={name}
          >
            <path d={icon.path} />
          </svg>
        ) : (
          <span className={fallbackClassName} style={{ backgroundColor: fill }} aria-hidden="true">
            {name.slice(0, 2).toUpperCase()}
          </span>
        )}
        {name}
      </div>
    );
  }

  return (
    <div className="group flex min-h-36 cursor-default flex-col items-center justify-center gap-4 rounded-md border border-transparent bg-white p-4 text-center transition hover:border-[#b4d6f5] hover:bg-[#e8f3ff] sm:min-h-24 sm:gap-3 sm:p-3 dark:bg-zinc-950 dark:hover:border-[#0a66c2] dark:hover:bg-[#0a66c2]/10">
      {icon ? (
        <svg
          role="img"
          viewBox="0 0 24 24"
          className={iconClassName}
          style={{ fill: "currentColor" }}
          aria-label={name}
        >
          <path d={icon.path} />
        </svg>
      ) : (
        <span
          className={fallbackClassName}
          style={{ backgroundColor: fill }}
          aria-hidden="true"
        >
          {name.slice(0, 2).toUpperCase()}
        </span>
      )}
      <span className="text-sm font-semibold leading-5 text-zinc-700 dark:text-zinc-300">
        {name}
      </span>
    </div>
  );
}
