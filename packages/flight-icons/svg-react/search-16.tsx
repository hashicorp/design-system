import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSearch16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M6.344.969a5.375 5.375 0 103.233 9.669l4.174 4.174a.75.75 0 001.06-1.061l-4.173-4.174A5.375 5.375 0 006.344.97zM2.469 6.344a3.875 3.875 0 117.75 0 3.875 3.875 0 01-7.75 0z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
