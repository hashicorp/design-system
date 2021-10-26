import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconSmartphone24 = forwardRef<SVGSVGElement, IconProps>(
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
          <path d="M12 19a1 1 0 100 2h.01a1 1 0 100-2H12z" />
          <path
            d="M6.75 1A2.75 2.75 0 004 3.75v16.5A2.75 2.75 0 006.75 23h10.5A2.75 2.75 0 0020 20.25V3.75A2.75 2.75 0 0017.25 1H6.75zM5.5 3.75c0-.69.56-1.25 1.25-1.25h10.5c.69 0 1.25.56 1.25 1.25v16.5c0 .69-.56 1.25-1.25 1.25H6.75c-.69 0-1.25-.56-1.25-1.25V3.75z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </g>
      </svg>
    )
  }
)
