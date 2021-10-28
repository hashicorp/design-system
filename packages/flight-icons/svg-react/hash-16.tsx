import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconHash16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="none"
                viewBox="0 0 16 16"
                aria-hidden={!title}
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M6.884 1.762a.75.75 0 01.604.872L7.058 5h2.975l.479-2.634a.75.75 0 111.476.268L11.558 5h1.192a.75.75 0 010 1.5h-1.465l-.546 3h2.011a.75.75 0 010 1.5h-2.283l-.48 2.634a.75.75 0 11-1.475-.268L8.942 11H5.967l-.48 2.634a.75.75 0 11-1.475-.268L4.442 11H3.25a.75.75 0 010-1.5h1.465l.545-3H3.25a.75.75 0 010-1.5h2.283l.479-2.634a.75.75 0 01.872-.604zM9.214 9.5l.546-3H6.785l-.546 3h2.976z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
