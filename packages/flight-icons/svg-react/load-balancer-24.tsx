import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconLoadBalancer24 = forwardRef<SVGSVGElement, IconProps>(
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
        <path
          fill={color}
          d="M12 2a.75.75 0 01.75.75V11h6.69l-1.72-1.72a.75.75 0 011.06-1.06l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72h-6.69v6.94l1.72-1.72a.75.75 0 111.06 1.06l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 111.06-1.06l1.72 1.72V12.5H4.56l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 1.06L4.56 11h6.69V2.75A.75.75 0 0112 2z"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
    )
  }
)
