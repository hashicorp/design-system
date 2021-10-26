import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconDotHalf24 = forwardRef<SVGSVGElement, IconProps>(
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
          d="M12 5a7 7 0 100 14 7 7 0 000-14zm0 1.5v11a5.5 5.5 0 100-11z"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
    )
  }
)
