import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconSlash24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden={!title}
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M16.63 4.103a.75.75 0 00-1.027.268l-8.5 14.5a.75.75 0 101.294.758l8.5-14.5a.75.75 0 00-.268-1.026z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
