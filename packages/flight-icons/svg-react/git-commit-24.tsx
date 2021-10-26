import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconGitCommit24 = forwardRef<SVGSVGElement, IconProps>(
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
          d="M15.93 11a4.001 4.001 0 00-7.86 0H3.75a.75.75 0 000 1.5h4.32a4.001 4.001 0 007.86 0h4.32a.75.75 0 000-1.5h-4.32zM12 9.25a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
    )
  }
)
