import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconGitBranch16 = forwardRef<SVGSVGElement, IconProps>(
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
          d="M12.719 6.913A3.001 3.001 0 0012 1a3 3 0 00-.787 5.896c-.282 2.395-2.124 4.164-4.561 4.34A3.005 3.005 0 004.5 9.095V2A.75.75 0 003 2v7.095a3.001 3.001 0 103.658 3.643c3.26-.187 5.758-2.606 6.061-5.825zM10.5 4a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm-8.25 8a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
    )
  }
)
