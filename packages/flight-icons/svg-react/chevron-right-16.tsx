import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconChevronRight16 = forwardRef<SVGSVGElement, IconProps>(
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
          d="M5.205 3.235a.75.75 0 00.03 1.06L9.158 8l-3.923 3.705a.75.75 0 001.03 1.09l4.5-4.25a.75.75 0 000-1.09l-4.5-4.25a.75.75 0 00-1.06.03z"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
    )
  }
)
