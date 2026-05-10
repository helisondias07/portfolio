import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary:
    "bg-[#0a66c2] text-white hover:bg-[#004182] dark:bg-[#70b5f9] dark:text-zinc-950 dark:hover:bg-[#a8d4ff]",
  secondary:
    "border border-[#0a66c2] bg-white text-[#0a66c2] hover:bg-[#e8f3ff] dark:border-[#70b5f9] dark:bg-zinc-950 dark:text-[#70b5f9] dark:hover:bg-zinc-900",
  ghost:
    "text-zinc-700 hover:bg-[#e8f3ff] hover:text-[#0a66c2] dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-[#70b5f9]",
};

export function Button({
  children,
  href,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-semibold transition",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a66c2] focus-visible:ring-offset-2",
    variants[variant],
    className,
  );

  const isRoute = href.startsWith("/") && !href.includes(".") && !props.download;

  if (!isRoute) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
