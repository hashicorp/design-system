import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconCreditCard16 = forwardRef<SVGSVGElement, IconProps>(
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
          <path d="M3.75 9a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5h-1.5z" />
          <path
            d="M0 4.25A2.25 2.25 0 012.25 2h11.5A2.25 2.25 0 0116 4.25v7.5A2.25 2.25 0 0113.75 14H2.25A2.25 2.25 0 010 11.75v-7.5zm14.5 0V5h-13v-.75a.75.75 0 01.75-.75h11.5a.75.75 0 01.75.75zm0 2.75h-13v4.75c0 .414.336.75.75.75h11.5a.75.75 0 00.75-.75V7z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </g>
      </svg>
    )
  }
)
