import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconArrowDownRight16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M3.22 3.22a.75.75 0 0 1 1.06 0l7.22 7.22V6.75a.75.75 0 0 1 1.5 0v5.5a.76.76 0 0 1-.22.53.75.75 0 0 1-.53.22h-5.5a.751.751 0 0 1 0-1.5h3.69L3.22 4.28a.75.75 0 0 1 0-1.06"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
