import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary'

function cls(variant: Variant, small?: boolean, extra?: string) {
  return ['btn', `btn--${variant}`, small ? 'btn--sm' : '', extra ?? ''].filter(Boolean).join(' ')
}

interface CommonProps {
  variant?: Variant
  small?: boolean
  className?: string
  children: ReactNode
}

export function Button({ variant = 'primary', small, className, children, type = 'button', ...rest }: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={cls(variant, small, className)} {...rest}>
      {children}
    </button>
  )
}

/** Enlace con apariencia de botón. Los enlaces externos se abren de forma segura. */
export function ButtonLink({ variant = 'primary', small, className, children, href, external, ...rest }: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; external?: boolean }) {
  const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <a href={href} className={cls(variant, small, className)} {...ext} {...rest}>
      {children}
    </a>
  )
}
