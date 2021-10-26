import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconArrowDownCircle24 = forwardRef<SVGSVGElement, IconProps>(
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
          <path d="M12 6a.75.75 0 01.75.75v8.614l2.955-3.129a.75.75 0 011.09 1.03l-4.25 4.5a.541.541 0 01-.068.064.747.747 0 01-.465.17L12 18h-.012a.748.748 0 01-.535-.237l-4.248-4.498a.75.75 0 011.09-1.03l2.955 3.129V6.75A.75.75 0 0112 6z" />
          <path
            d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm11-9.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </g>
      </svg>
    )
  }
)
