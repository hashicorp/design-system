import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPlus24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12.25 4.25A.75.75 0 0 1 13 5v6.5h6.5a.75.75 0 0 1 0 1.5H13v6.5a.75.75 0 0 1-1.5 0V13H5a.75.75 0 0 1 0-1.5h6.5V5a.75.75 0 0 1 .75-.75"
                />
            </svg>
        );
    }
);
