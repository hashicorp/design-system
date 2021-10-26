import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconArrowDownRight24 = forwardRef<SVGSVGElement, IconProps>(
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
        <path
          fill={color}
          d="M5.22 7.28a.75.75 0 011.06-1.06L17.5 17.44V9.75a.75.75 0 011.5 0v9.5a.747.747 0 01-.75.75h-9.5a.75.75 0 010-1.5h7.69L5.22 7.28z"
        />
      </svg>
    )
  }
)
