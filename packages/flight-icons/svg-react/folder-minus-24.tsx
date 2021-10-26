import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconFolderMinus24 = forwardRef<SVGSVGElement, IconProps>(
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
          <path d="M8.75 13a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" />
          <path
            d="M1 4.75A2.75 2.75 0 013.75 2h5.672c.729 0 1.428.29 1.944.805l.829.829c.234.234.552.366.883.366h7.172A2.75 2.75 0 0123 6.75v12.5A2.75 2.75 0 0120.25 22H3.75A2.75 2.75 0 011 19.25V4.75zM3.75 3.5c-.69 0-1.25.56-1.25 1.25V7h16.75a.75.75 0 010 1.5H2.5v10.75c0 .69.56 1.25 1.25 1.25h16.5c.69 0 1.25-.56 1.25-1.25V6.75c0-.69-.56-1.25-1.25-1.25h-7.172a2.75 2.75 0 01-1.944-.805l-.829-.829a1.25 1.25 0 00-.883-.366H3.75z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </g>
      </svg>
    )
  }
)
