import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconSkipBack16 = forwardRef<SVGSVGElement, IconProps>(
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
            d="M11.24 2.5C12.4 1.682 14 2.51 14 3.93v8.14c0 1.419-1.6 2.248-2.76 1.43L5.476 9.43a1.75 1.75 0 010-2.86L11.24 2.5zm1.26 1.43a.25.25 0 00-.394-.204L6.34 7.796a.25.25 0 000 .408l5.766 4.07a.25.25 0 00.394-.204V3.93z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
          <path d="M3.5 3A.75.75 0 002 3v10a.75.75 0 001.5 0V3z" />
        </g>
      </svg>
    )
  }
)
