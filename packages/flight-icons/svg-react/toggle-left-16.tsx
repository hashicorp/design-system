import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconToggleLeft16 = forwardRef<SVGSVGElement, IconProps>(
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
          <path d="M3 8a2 2 0 114 0 2 2 0 01-4 0z" />
          <path
            d="M5 3a5 5 0 000 10h6a5 5 0 000-10H5zM1.5 8A3.5 3.5 0 015 4.5h6a3.5 3.5 0 110 7H5A3.5 3.5 0 011.5 8z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </g>
      </svg>
    )
  }
)
