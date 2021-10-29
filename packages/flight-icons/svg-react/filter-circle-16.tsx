import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconFilterCircle16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M5.75 7.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zM3.5 5.75A.75.75 0 014.25 5h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM7 10a.75.75 0 000 1.5h2A.75.75 0 009 10H7z" />
                    <path
                        fillRule="evenodd"
                        d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
