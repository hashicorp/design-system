import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconDroplet16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M7.477 1.213a.75.75 0 0 1 1.046 0l3.813 3.709.02.02A5.93 5.93 0 0 1 14 9.04C14 12.337 11.308 15 8 15s-6-2.663-6-5.959a5.93 5.93 0 0 1 1.664-4.12zM4.72 5.986A4.43 4.43 0 0 0 3.5 9.041C3.5 11.498 5.51 13.5 8 13.5s4.5-2.002 4.5-4.459c0-1.18-.463-2.256-1.22-3.055L8 2.796z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
