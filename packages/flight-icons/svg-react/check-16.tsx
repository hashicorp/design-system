import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCheck16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = useMemo(
            () =>
                title
                    ? 'title-' + Math.random().toString(36).substr(2, 9)
                    : undefined,
            [title]
        );
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
                    d="M13.72 3.22a.75.75 0 011.06 1.06l-8.5 8.5a.753.753 0 01-1.06 0l-4-4a.75.75 0 011.06-1.06l3.47 3.47 7.97-7.97z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
