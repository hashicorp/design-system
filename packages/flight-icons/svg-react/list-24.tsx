import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconList24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M2.5 5.75A.75.75 0 013.25 5h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm4.5 0A.75.75 0 017.75 5h13a.75.75 0 010 1.5h-13A.75.75 0 017 5.75zm-4.5 6a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm4.5 0a.75.75 0 01.75-.75h13a.75.75 0 010 1.5h-13a.75.75 0 01-.75-.75zm-4.5 6a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm4.5 0a.75.75 0 01.75-.75h13a.75.75 0 010 1.5h-13a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
