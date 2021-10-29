import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconUser24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
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
                <g fill={color}>
                    <path
                        fillRule="evenodd"
                        d="M12 3a5 5 0 100 10 5 5 0 000-10zM8.5 8a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z"
                        clipRule="evenodd"
                    />
                    <path d="M7.75 14.5A4.75 4.75 0 003 19.25v1a.75.75 0 001.5 0v-1A3.25 3.25 0 017.75 16h8.5a3.25 3.25 0 013.25 3.25v1a.75.75 0 001.5 0v-1a4.75 4.75 0 00-4.75-4.75h-8.5z" />
                </g>
            </svg>
        );
    }
);
