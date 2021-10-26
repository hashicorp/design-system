import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconOkta16 = forwardRef<SVGSVGElement, IconProps>(
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
          d="M8 1C4.143 1 1 4.12 1 8s3.121 7 7 7 7-3.121 7-7-3.143-7-7-7zm0 10.5c-1.94 0-3.5-1.56-3.5-3.5S6.06 4.5 8 4.5s3.5 1.56 3.5 3.5-1.56 3.5-3.5 3.5z"
        />
      </svg>
    )
  }
)
