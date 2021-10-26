import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconGoogle24 = forwardRef<SVGSVGElement, IconProps>(
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
          d="M16.036 7.457a5.434 5.434 0 00-3.836-1.5c-2.609 0-4.825 1.76-5.615 4.13a5.99 5.99 0 000 3.83h.004c.794 2.366 3.006 4.126 5.614 4.126 1.347 0 2.503-.345 3.4-.953v-.003A4.63 4.63 0 0017.6 14.05H12.2v-3.85h9.432c.117.668.172 1.351.172 2.031 0 3.041-1.087 5.613-2.978 7.354l.002.002C17.171 21.115 14.897 22 12.2 22c-3.781 0-7.239-2.131-8.936-5.508a10.008 10.008 0 010-8.98A9.998 9.998 0 0112.2 2.001a9.61 9.61 0 016.69 2.601l-2.854 2.855z"
        />
      </svg>
    )
  }
)
