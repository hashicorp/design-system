import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconClock16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 0a8 8 0 110 16A8 8 0 018 0zm0 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM7.75 3a.75.75 0 01.75.75v3.786l2.085 1.043a.75.75 0 01-.67 1.342l-2.5-1.25A.75.75 0 017 8V3.75A.75.75 0 017.75 3z"
                />
            </svg>
        );
    }
);
