import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconMinimizeAlt24 = forwardRef<SVGSVGElement, IconProps>(
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
          d="M8.25 2.25A.75.75 0 019 3v3.25A2.75 2.75 0 016.25 9H3a.75.75 0 010-1.5h3.25c.69 0 1.25-.56 1.25-1.25V3a.75.75 0 01.75-.75zm7.5 0a.75.75 0 01.75.75v3.25c0 .69.56 1.25 1.25 1.25H21A.75.75 0 0121 9h-3.25A2.75 2.75 0 0115 6.25V3a.75.75 0 01.75-.75zm-13.5 13.5A.75.75 0 013 15h3.25A2.75 2.75 0 019 17.75V21a.75.75 0 01-1.5 0v-3.25c0-.69-.56-1.25-1.25-1.25H3a.75.75 0 01-.75-.75zm12.75 2A2.75 2.75 0 0117.75 15H21a.75.75 0 010 1.5h-3.25c-.69 0-1.25.56-1.25 1.25V21a.75.75 0 01-1.5 0v-3.25z"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
    )
  }
)
