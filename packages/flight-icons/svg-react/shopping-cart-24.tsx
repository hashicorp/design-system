import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconShoppingCart24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M9.75 19a1.75 1.75 0 1 1 0 3.5h-.01a1.75 1.75 0 0 1 0-3.5zm10 0a1.75 1.75 0 1 1 0 3.5h-.01a1.75 1.75 0 1 1 0-3.5zM3.339 1.5a2.75 2.75 0 0 1 2.703 2.245L6.276 5h14.596a2.75 2.75 0 0 1 2.71 3.22l-1.305 7.5a2.75 2.75 0 0 1-2.71 2.28H9.426a2.75 2.75 0 0 1-2.708-2.269l-.706-3.971-1.445-7.74A1.25 1.25 0 0 0 3.34 3H1.25a.75.75 0 0 1 0-1.5zm4.15 9.994.706 3.975a1.25 1.25 0 0 0 1.23 1.031h10.142c.608 0 1.129-.437 1.233-1.036l1.303-7.5a1.25 1.25 0 0 0-1.23-1.464H6.556z"
                />
            </svg>
        );
    }
);
