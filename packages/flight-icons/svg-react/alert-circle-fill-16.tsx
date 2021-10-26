import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconAlertCircleFill16 = forwardRef<SVGSVGElement, IconProps>(
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
          d="M0 8a8 8 0 1116 0A8 8 0 010 8zm8-4a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 4zm0 6a1 1 0 100 2h.007a1 1 0 100-2H8z"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
    )
  }
)
