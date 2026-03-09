import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCornerDownLeft16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12.75 2a.75.75 0 01.75.75v4.5a3.25 3.25 0 01-3.25 3.25H4.56l2.22 2.22a.75.75 0 11-1.06 1.06l-3.5-3.5a.748.748 0 010-1.06l3.5-3.5a.75.75 0 111.06 1.06L4.56 9h5.69A1.75 1.75 0 0012 7.25v-4.5a.75.75 0 01.75-.75z"
                />
            </svg>
        );
    }
);
