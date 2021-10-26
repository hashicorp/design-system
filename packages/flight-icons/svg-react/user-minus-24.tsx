import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconUserMinus24 = forwardRef<SVGSVGElement, IconProps>(
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
            d="M4 8a5 5 0 1110 0A5 5 0 014 8zm5-3.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
          <path d="M0 19.25a4.75 4.75 0 014.75-4.75h8.5A4.75 4.75 0 0118 19.25v1a.75.75 0 01-1.5 0v-1A3.25 3.25 0 0013.25 16h-8.5a3.25 3.25 0 00-3.25 3.25v1a.75.75 0 01-1.5 0v-1zM16.75 10.5a.75.75 0 000 1.5h5.5a.75.75 0 000-1.5h-5.5z" />
        </g>
      </svg>
    )
  }
)
