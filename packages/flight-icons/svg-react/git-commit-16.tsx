import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconGitCommit16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="none"
                viewBox="0 0 16 16"
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M10.905 7a3.001 3.001 0 00-5.81 0H2.75a.75.75 0 000 1.5h2.345a3.001 3.001 0 005.81 0h2.345a.75.75 0 000-1.5h-2.345zM8 6.25a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
