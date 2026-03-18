import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconArrowLeftCircle24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1m0 1.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19m-1.265 4.705a.75.75 0 1 1 1.03 1.09L8.637 11.25h8.613a.75.75 0 0 1 0 1.5H8.637l3.128 2.955a.75.75 0 1 1-1.03 1.09l-4.499-4.25a.748.748 0 0 1 .001-1.093z"
                />
            </svg>
        );
    }
);
