import type { ReactNode } from 'react'

interface Props {
  id: string
  title: string
  description?: ReactNode
  align?: 'left' | 'center'
}

export function SectionHeading({ id, title, description, align = 'left' }: Props) {
  return (
    <div className={align === 'center' ? 'section-head section-head--center' : 'section-head'}>
      <h2 id={id} className="section-title">
        {title}
      </h2>
      {description ? <p className="section-desc">{description}</p> : null}
    </div>
  )
}
