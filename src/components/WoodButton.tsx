import Link from "next/link";
import { ReactNode } from "react";

interface WoodButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

export default function WoodButton({
  href,
  onClick,
  children,
  disabled,
  className = "",
}: WoodButtonProps) {
  const classes = `wood-button ${className}`;

  if (href && !disabled) {
    return (
      <Link href={href} className={`inline-block text-center no-underline ${classes}`}>
        {children}
      </Link>
    );
  }

  if (href && disabled) {
    return (
      <span className={`inline-block cursor-not-allowed text-center no-underline ${classes}`} aria-disabled>
        {children}
      </span>
    );
  }

  return (
    <button type="button" onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
