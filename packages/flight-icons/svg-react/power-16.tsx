import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconPower16 = forwardRef<SVGSVGElement, IconProps>(
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
        <g fill={color}>
          <path d="M8.5 1.25a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0v-5.5z" />
          <path d="M3.548 3.825a.75.75 0 00-1.096-1.024 7.25 7.25 0 1010.596 0 .75.75 0 00-1.096 1.024 5.75 5.75 0 11-8.404 0z" />
        </g>
      </svg>
    )
  }
)
