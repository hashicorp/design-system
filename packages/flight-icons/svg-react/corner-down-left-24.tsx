import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCornerDownLeft24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M20.75 3a.75.75 0 01.75.75v7a4.635 4.635 0 01-1.48 3.375A5.139 5.139 0 0116.5 15.5H5.622l4.146 3.957a.75.75 0 01-1.036 1.086l-5.5-5.25a.747.747 0 01.001-1.087l5.5-5.249a.75.75 0 011.035 1.086L5.622 14H16.5c.942 0 1.838-.353 2.491-.968A3.135 3.135 0 0020 10.75v-7a.75.75 0 01.75-.75z"
                />
            </svg>
        );
    }
);
