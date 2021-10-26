import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconCornerRightUp16 = forwardRef<SVGSVGElement, IconProps>(
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
          d="M6.78 6.78a.75.75 0 01-1.06-1.06l3.5-3.5a.75.75 0 011.06 0l3.5 3.5a.75.75 0 01-1.06 1.06L10.5 4.56v5.69a3.25 3.25 0 01-3.25 3.25h-4.5a.75.75 0 010-1.5h4.5A1.75 1.75 0 009 10.25V4.56L6.78 6.78z"
        />
      </svg>
    )
  }
)
