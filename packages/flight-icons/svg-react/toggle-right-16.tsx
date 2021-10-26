import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconToggleRight16 = forwardRef<SVGSVGElement, IconProps>(
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
          <path d="M13 8a2 2 0 10-4 0 2 2 0 004 0z" />
          <path
            d="M11 3a5 5 0 010 10H5A5 5 0 015 3h6zm3.5 5A3.5 3.5 0 0011 4.5H5a3.5 3.5 0 100 7h6A3.5 3.5 0 0014.5 8z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </g>
      </svg>
    )
  }
)
