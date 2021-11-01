import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconArrowUp24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M5.04 10.771A.75.75 0 013.96 9.73l7.25-7.5a.75.75 0 011.08 0l7.25 7.5a.75.75 0 11-1.08 1.042L12.5 4.605V20.25a.75.75 0 01-1.5 0V4.605l-5.96 6.166z"
                />
            </svg>
        );
    }
);
