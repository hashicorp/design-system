import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconNavigationAlt24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 2a.75.75 0 01.698.476l7.25 18.5a.75.75 0 01-1.053.935L12 18.207 5.105 21.91a.75.75 0 01-1.053-.935l7.25-18.5A.75.75 0 0112 2zM6.193 19.623l5.452-2.928a.75.75 0 01.71 0l5.452 2.928L12 4.806 6.193 19.623z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
