import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconDisc16 = forwardRef<SVGSVGElement, IconProps>(
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
        <g fill={color} fillRule="evenodd" clipRule="evenodd">
          <path d="M8 5.05a2.95 2.95 0 100 5.9 2.95 2.95 0 000-5.9zM6.45 8a1.55 1.55 0 113.1 0 1.55 1.55 0 01-3.1 0z" />
          <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z" />
        </g>
      </svg>
    )
  }
)
