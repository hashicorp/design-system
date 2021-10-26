import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconMaximizeAlt24 = forwardRef<SVGSVGElement, IconProps>(
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
          d="M2 4.75A2.75 2.75 0 014.75 2H8a.75.75 0 010 1.5H4.75c-.69 0-1.25.56-1.25 1.25V8A.75.75 0 012 8V4.75zm13.25-2A.75.75 0 0116 2h3.25A2.75 2.75 0 0122 4.75V8a.75.75 0 01-1.5 0V4.75c0-.69-.56-1.25-1.25-1.25H16a.75.75 0 01-.75-.75zm-12.5 12.5a.75.75 0 01.75.75v3.25c0 .69.56 1.25 1.25 1.25H8A.75.75 0 018 22H4.75A2.75 2.75 0 012 19.25V16a.75.75 0 01.75-.75zm18.5 0A.75.75 0 0122 16v3.25A2.75 2.75 0 0119.25 22H16a.75.75 0 010-1.5h3.25c.69 0 1.25-.56 1.25-1.25V16a.75.75 0 01.75-.75z"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
    )
  }
)
