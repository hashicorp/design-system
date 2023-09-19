import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGoogleSlides24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M15.398 10.864H8.602v3.863h6.796v-3.863z" />
                    <path
                        fillRule="evenodd"
                        d="M6.11 22h11.78c.748 0 1.36-.614 1.36-1.364V7l-4.984-5H6.109c-.747 0-1.359.614-1.359 1.364v17.272c0 .75.612 1.364 1.36 1.364zM16.53 9.727H7.47v6.137h9.062V9.727z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
