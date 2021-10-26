import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconDot16 = forwardRef<SVGSVGElement, IconProps>(
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
        <path fill={color} d="M8 3a5 5 0 100 10A5 5 0 008 3z" />
      </svg>
    )
  }
)
