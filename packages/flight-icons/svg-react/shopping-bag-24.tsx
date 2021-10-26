import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconShoppingBag24 = forwardRef<SVGSVGElement, IconProps>(
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
          <path d="M9 10.5a.75.75 0 00-1.5 0 4.5 4.5 0 109 0 .75.75 0 00-1.5 0 3 3 0 01-6 0z" />
          <path
            d="M5.612 1.865A2.75 2.75 0 017.614 1h8.772a2.75 2.75 0 012.002.865l2.865 3.043c.48.51.747 1.185.747 1.885V20.25A2.75 2.75 0 0119.25 23H4.75A2.75 2.75 0 012 20.25V6.793c0-.7.267-1.374.747-1.885l2.865-3.043zm2.002.635a1.25 1.25 0 00-.91.393L4.25 5.5h15.498l-2.453-2.607a1.25 1.25 0 00-.91-.393H7.614zM3.5 20.25V7h17v13.25c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </g>
      </svg>
    )
  }
)
