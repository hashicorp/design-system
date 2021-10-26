import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconMigrate16 = forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 16 16"
        {...props}
        ref={forwardedRef}
      >
        <g fill={color}>
          <path d="M9.22 3.72a.75.75 0 011.06 0l3.5 3.5a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 11-1.06-1.06l2.97-2.97-2.97-2.97a.75.75 0 010-1.06z" />
          <path d="M5.22 3.72a.75.75 0 011.06 0l3.5 3.5a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 01-1.06-1.06L7.44 8.5H2A.75.75 0 012 7h5.44L5.22 4.78a.75.75 0 010-1.06z" />
        </g>
      </svg>
    )
  }
)
