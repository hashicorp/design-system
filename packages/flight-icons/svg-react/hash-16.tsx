import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconHash16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M10.512 2.364a.752.752 0 01.872-.603.751.751 0 01.603.872l-.43 2.366h1.193a.75.75 0 010 1.5h-1.465l-.546 3h2.011a.75.75 0 010 1.5h-2.283l-.48 2.634a.75.75 0 01-1.475-.269L8.942 11H5.967l-.48 2.634a.75.75 0 01-1.475-.269L4.442 11H3.25a.75.75 0 010-1.5h1.465l.546-3H3.25a.75.75 0 010-1.5h2.283l.479-2.635a.752.752 0 01.872-.603.751.751 0 01.603.872l-.43 2.366h2.976l.479-2.635zM6.239 9.5h2.976l.546-3H6.785l-.546 3z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
