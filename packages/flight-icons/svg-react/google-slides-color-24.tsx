import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGoogleSlidesColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#FBBC04"
                    d="M17.89 22H6.11c-.748 0-1.36-.614-1.36-1.364V3.364C4.75 2.614 5.362 2 6.11 2h8.156l4.984 5v13.636c0 .75-.612 1.364-1.36 1.364z"
                />
                <path fill="#F29900" d="M14.266 2l4.984 5h-4.984V2z" />
                <path
                    fill="#FDFFFF"
                    fillRule="evenodd"
                    d="M16.531 9.727H7.47v6.137h9.062V9.727zm-1.133 1.137H8.602v3.863h6.796v-3.863z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
