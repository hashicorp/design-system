import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSwapVertical24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M4.455 5.735a.75.75 0 001.09 1.03L8.5 3.636v8.614a.75.75 0 001.5 0V3.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5zM15.5 20.364V11.75a.75.75 0 00-1.5 0v8.614l-2.955-3.129a.75.75 0 00-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03L15.5 20.364z" />
                </g>
            </svg>
        );
    }
);
