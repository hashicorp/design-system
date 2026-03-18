import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconRewind24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M10.188 5.38C11.34 4.501 13 5.322 13 6.771v3.332l6.188-4.723C20.34 4.501 22 5.322 22 6.771V17.23c0 1.449-1.66 2.27-2.812 1.391L13 13.898v3.331c0 1.449-1.66 2.27-2.812 1.391l-6.851-5.229a1.75 1.75 0 0 1 0-2.782zM11.5 6.771a.25.25 0 0 0-.402-.198L4.247 11.8a.25.25 0 0 0 0 .398l6.851 5.229a.25.25 0 0 0 .402-.199zm9 0a.25.25 0 0 0-.402-.198l-7.061 5.389v.077l7.061 5.389a.25.25 0 0 0 .402-.199z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
