import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconCircleHalf16 = forwardRef<SVGSVGElement, IconProps>(
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
          d="M8 0a8 8 0 100 16A8 8 0 008 0zm0 1.5v13a6.5 6.5 0 100-13z"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
    )
  }
)
