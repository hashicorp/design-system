import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGoogleSheets24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M11.434 15.182H8.602V13.59h2.832v1.59zM11.434 12.455H8.602v-1.591h2.832v1.59zM15.398 15.182h-2.832V13.59h2.832v1.59zM15.398 12.455h-2.832v-1.591h2.832v1.59z" />
                    <path
                        fillRule="evenodd"
                        d="M19.25 20.636V7l-4.984-5H6.109c-.75 0-1.359.61-1.359 1.364v17.272c0 .754.608 1.364 1.36 1.364h11.78c.752 0 1.36-.61 1.36-1.364zM7.469 9.727v6.591h9.062v-6.59H7.47z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
