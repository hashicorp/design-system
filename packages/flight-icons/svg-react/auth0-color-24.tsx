import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconAuth0Color24 = forwardRef<SVGSVGElement, IconProps>(
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
          fill="#000"
          d="M17.848 3H12l1.807 5.63h5.849l-4.732 3.358 1.808 5.663c3.046-2.218 4.041-5.575 2.924-9.02L17.848 3zM4.344 8.63h5.849L12 3H6.152L4.344 8.63c-1.117 3.446-.122 6.802 2.924 9.02l1.808-5.662-4.732-3.357zm2.924 9.02L12 21l4.732-3.35L12 14.244 7.268 17.65z"
        />
      </svg>
    )
  }
)
