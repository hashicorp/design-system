import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconVideo24 = forwardRef<SVGSVGElement, IconProps>(
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
          d="M0 6.75A2.75 2.75 0 012.75 4h11.5A2.75 2.75 0 0117 6.75v3.138l4.127-3.322C22.264 5.613 24 6.42 24 7.908v8.184c0 1.488-1.738 2.296-2.875 1.34L17 14.078v3.173A2.75 2.75 0 0114.25 20H2.75A2.75 2.75 0 010 17.25V6.75zm17 5.23c0 .103.047.201.127.267l4.95 4.026.011.01a.25.25 0 00.412-.19V7.907a.25.25 0 00-.412-.19l-.014.011-4.945 3.981a.345.345 0 00-.129.27zm-1.5-5.23c0-.69-.56-1.25-1.25-1.25H2.75c-.69 0-1.25.56-1.25 1.25v10.5c0 .69.56 1.25 1.25 1.25h11.5c.69 0 1.25-.56 1.25-1.25V6.75z"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
    )
  }
)
