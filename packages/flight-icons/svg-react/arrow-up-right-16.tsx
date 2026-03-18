import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconArrowUpRight16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12.25 3a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V5.56l-7.22 7.22a.75.75 0 0 1-1.06-1.06l7.22-7.22H6.75a.75.75 0 0 1 0-1.5z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
