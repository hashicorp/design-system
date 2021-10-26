import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconNavigationAlt16 = forwardRef<SVGSVGElement, IconProps>(
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
          d="M8 1a.75.75 0 01.692.46l5.25 12.5a.75.75 0 01-1.028.96L8 12.457 3.086 14.92a.75.75 0 01-1.027-.96l5.25-12.5A.75.75 0 018 1zM4.227 12.67l3.437-1.722a.75.75 0 01.672 0l3.437 1.723L8 3.687 4.227 12.67z"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
    )
  }
)
