import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconPieChart16 = forwardRef<SVGSVGElement, IconProps>(
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
          <path
            d="M7.75.05a.7.7 0 00-.7.7v7.5a.7.7 0 00.7.7h7.5a.7.7 0 00.7-.7 8.2 8.2 0 00-8.2-8.2zm.7 7.5V1.486a6.8 6.8 0 016.064 6.064H8.45z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
          <path d="M5.118 2.172A.75.75 0 004.452.828a8 8 0 1010.72 10.72.75.75 0 00-1.344-.666 6.5 6.5 0 11-8.71-8.71z" />
        </g>
      </svg>
    )
  }
)
