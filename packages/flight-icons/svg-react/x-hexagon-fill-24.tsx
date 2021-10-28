import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconXHexagonFill24 = forwardRef<SVGSVGElement, IconProps>(
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
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M13.441 1.006a2.75 2.75 0 00-2.882 0l-7.75 4.77a2.75 2.75 0 00-1.31 2.341v7.765a2.75 2.75 0 001.31 2.342l7.75 4.77a2.75 2.75 0 002.882 0l7.75-4.77a2.75 2.75 0 001.309-2.342V8.117a2.75 2.75 0 00-1.309-2.342l-7.75-4.769zM14.72 8.22a.75.75 0 011.06 1.061L13.06 12l2.72 2.72a.75.75 0 01-1.06 1.06L12 13.06l-2.72 2.72a.75.75 0 11-1.06-1.06L10.94 12 8.22 9.28a.75.75 0 011.06-1.06L12 10.94l2.72-2.72z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
