import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconChevronsRight16 = forwardRef<SVGSVGElement, IconProps>(
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
          <path d="M3.24 5.3a.75.75 0 011.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1L6.148 8 3.24 5.3z" />
          <path d="M8.24 5.3a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1L11.148 8 8.24 5.3z" />
        </g>
      </svg>
    )
  }
)
