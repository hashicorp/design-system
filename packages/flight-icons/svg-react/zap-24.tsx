import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconZap24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M13.333 1.065a.75.75 0 01.437.791l-.918 6.409 8.48.94a.75.75 0 01.494 1.226l-10.278 12.3a.75.75 0 01-1.318-.587l.918-6.409-8.48-.94a.75.75 0 01-.494-1.226l10.278-12.3a.75.75 0 01.881-.204zM4.222 13.458l7.86.872a.75.75 0 01.66.851l-.653 4.563 7.69-9.202-7.862-.872a.75.75 0 01-.66-.851l.654-4.563-7.69 9.203z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
