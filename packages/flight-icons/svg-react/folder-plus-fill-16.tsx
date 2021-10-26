import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconFolderPlusFill16 = forwardRef<SVGSVGElement, IconProps>(
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
          d="M0 3.25A2.25 2.25 0 012.25 1h4.379a2.25 2.25 0 011.59.659L9.342 2.78c.14.141.331.22.53.22h3.879A2.25 2.25 0 0116 5.25v7.5A2.25 2.25 0 0113.75 15H2.25A2.25 2.25 0 010 12.75v-9.5zM7.75 6a.75.75 0 01.75.75V8h1.25a.75.75 0 010 1.5H8.5v1.25a.75.75 0 01-1.5 0V9.5H5.75a.75.75 0 010-1.5H7V6.75A.75.75 0 017.75 6z"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
    )
  }
)
