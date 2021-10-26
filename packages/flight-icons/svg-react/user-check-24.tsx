import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconUserCheck24 = forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        {...props}
        ref={forwardedRef}
      >
        <g fill={color}>
          <path
            d="M9 3a5 5 0 100 10A5 5 0 009 3zM5.5 8a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
          <path d="M4.75 14.5A4.75 4.75 0 000 19.25v1a.75.75 0 001.5 0v-1A3.25 3.25 0 014.75 16h8.5a3.25 3.25 0 013.25 3.25v1a.75.75 0 001.5 0v-1a4.75 4.75 0 00-4.75-4.75h-8.5zM23.28 8.72a.75.75 0 010 1.06l-4 4a.75.75 0 01-1.06 0l-2-2a.75.75 0 111.06-1.06l1.47 1.47 3.47-3.47a.75.75 0 011.06 0z" />
        </g>
      </svg>
    )
  }
)
