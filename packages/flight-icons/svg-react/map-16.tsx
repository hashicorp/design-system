import { forwardRef } from 'react'
import { IconProps } from './types'

export const IconMap16 = forwardRef<SVGSVGElement, IconProps>(
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
          d="M5.2 1.187c.34-.17.738-.176 1.083-.016l3.983 1.843 4.003-1.668A1.25 1.25 0 0116 2.5v8.941c0 .473-.268.906-.691 1.118l-4.508 2.254c-.34.17-.74.176-1.085.017l-3.982-1.844-4.003 1.668A1.25 1.25 0 010 13.5V4.56c0-.474.268-.907.691-1.119l4.508-2.254zM1.5 4.714L5 2.964v8.703l-3.5 1.458V4.714zm8 8.362l-3-1.389V2.925l3 1.389v8.763zm1.5-.04l3.5-1.75v-8.41L11 4.332v8.704z"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
    )
  }
)
