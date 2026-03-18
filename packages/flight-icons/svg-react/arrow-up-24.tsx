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
                    fillRule="evenodd"
                    d="M11.75 2c.202 0 .398.083.539.229l7.25 7.5a.753.753 0 0 1-.018 1.06.75.75 0 0 1-1.06-.018L12.5 4.605V20.25a.75.75 0 0 1-1.5 0V4.604l-5.961 6.167a.75.75 0 0 1-1.078-1.043l7.25-7.5A.75.75 0 0 1 11.75 2"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
