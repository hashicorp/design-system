import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconCornerLeftUp16 = forwardRef<SVGSVGElement, IconProps>(
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
          d="M9.22 6.78a.75.75 0 101.06-1.06l-3.5-3.5a.75.75 0 00-1.06 0l-3.5 3.5a.75.75 0 001.06 1.06L5.5 4.56v5.69a3.25 3.25 0 003.25 3.25h4.5a.75.75 0 000-1.5h-4.5A1.75 1.75 0 017 10.25V4.56l2.22 2.22z"
        />
      </svg>
    )
  }
)
