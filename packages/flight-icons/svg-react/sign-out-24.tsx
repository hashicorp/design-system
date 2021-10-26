import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconSignOut24 = forwardRef<SVGSVGElement, IconProps>(
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
          <path d="M9.5 2.75A.75.75 0 008.75 2h-4A2.75 2.75 0 002 4.75v14.5A2.75 2.75 0 004.75 22h4a.75.75 0 000-1.5h-4c-.69 0-1.25-.56-1.25-1.25V4.75c0-.69.56-1.25 1.25-1.25h4a.75.75 0 00.75-.75z" />
          <path d="M15.47 6.22a.75.75 0 011.06 0l5 5a.75.75 0 010 1.06l-5 5a.75.75 0 11-1.06-1.06l3.72-3.72H9A.75.75 0 019 11h10.19l-3.72-3.72a.75.75 0 010-1.06z" />
        </g>
      </svg>
    )
  }
)
