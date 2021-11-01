import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCornerUpLeft24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M9.768 13.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.036 1.086L5.622 8.5H16.5c1.312 0 2.578.49 3.52 1.375.942.887 1.48 2.1 1.48 3.375v7a.75.75 0 01-1.5 0v-7c0-.847-.357-1.669-1.009-2.282A3.639 3.639 0 0016.5 10H5.622l4.146 3.957z"
                />
            </svg>
        );
    }
);
