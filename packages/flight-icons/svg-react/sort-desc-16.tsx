import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSortDesc16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12.25 6a.75.75 0 01.75.75v4.69l1.72-1.72a.75.75 0 111.06 1.06l-3 3a.748.748 0 01-1.06 0l-3-3a.75.75 0 111.06-1.06l1.72 1.72V6.75a.75.75 0 01.75-.75zM6 12a.75.75 0 010 1.5H3A.75.75 0 013 12h3zm0-3a.75.75 0 010 1.5H3A.75.75 0 013 9h3zm3-3a.75.75 0 010 1.5H3A.75.75 0 013 6h6zm4-3a.75.75 0 010 1.5H3A.75.75 0 013 3h10z"
                />
            </svg>
        );
    }
);
