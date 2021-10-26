import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconBattery16 = forwardRef<SVGSVGElement, IconProps>(
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
            d="M2.25 3A2.25 2.25 0 000 5.25v5.5A2.25 2.25 0 002.25 13h8.5A2.25 2.25 0 0013 10.75v-5.5A2.25 2.25 0 0010.75 3h-8.5zM1.5 5.25a.75.75 0 01.75-.75h8.5a.75.75 0 01.75.75v5.5a.75.75 0 01-.75.75h-8.5a.75.75 0 01-.75-.75v-5.5z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
          <path d="M15.5 6.75a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5z" />
        </g>
      </svg>
    )
  }
)
