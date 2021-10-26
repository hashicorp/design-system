import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconOracleColor16 = forwardRef<SVGSVGElement, IconProps>(
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
          fill="#EA1B22"
          d="M.1 8c0 2.761 2.237 5 4.997 5h5.806A4.999 4.999 0 0015.9 8c0-2.761-2.237-5-4.997-5H5.097A4.999 4.999 0 00.1 8zm13.911 0a3.235 3.235 0 01-3.234 3.237H5.226A3.235 3.235 0 011.992 8a3.235 3.235 0 013.234-3.236h5.55A3.235 3.235 0 0114.012 8z"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
    )
  }
)
