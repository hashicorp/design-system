import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconArrowDown16 = forwardRef<SVGSVGElement, IconProps>(
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
        <path
          fill={color}
          d="M8.5 2.75a.75.75 0 00-1.5 0v8.614L4.045 8.235a.75.75 0 00-1.09 1.03l4.248 4.498a.862.862 0 00.025.026.747.747 0 00.51.21L7.75 14h.012a.747.747 0 00.533-.235l4.25-4.5a.75.75 0 00-1.09-1.03L8.5 11.364V2.75z"
        />
      </svg>
    )
  }
)
