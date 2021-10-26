import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconAlignCenter24 = forwardRef<SVGSVGElement, IconProps>(
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
        <g fill={color}>
          <path d="M2.75 5a.75.75 0 000 1.5h18.5a.75.75 0 000-1.5H2.75zM5.75 9a.75.75 0 000 1.5h12.5a.75.75 0 000-1.5H5.75zM2 13.75a.75.75 0 01.75-.75h18.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zM5.75 17a.75.75 0 000 1.5h12.5a.75.75 0 000-1.5H5.75z" />
        </g>
      </svg>
    )
  }
)
