import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconActivity16 = forwardRef<SVGSVGElement, IconProps>(
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
          d="M6.016 1a.75.75 0 01.698.521l3.306 10.33 1.47-4.341A.75.75 0 0112.2 7H15a.75.75 0 010 1.5h-2.262l-2.028 5.99a.75.75 0 01-1.424-.011L5.952 4.06 4.504 8.008A.75.75 0 013.8 8.5H1A.75.75 0 111 7h2.276l2.02-5.508c.11-.301.4-.499.72-.492z"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
    )
  }
)

IconActivity16.displayName = 'IconActivity16'
