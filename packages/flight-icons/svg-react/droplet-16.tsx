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
                    d="M7.477 1.213a.752.752 0 011.046 0l3.813 3.709A5.925 5.925 0 0114 9.042c0 3.295-2.692 5.958-6 5.958s-6-2.663-6-5.959a5.925 5.925 0 011.664-4.12l3.813-3.708zM4.72 5.986A4.425 4.425 0 003.5 9.041C3.5 11.498 5.51 13.5 8 13.5s4.5-2.002 4.5-4.459c0-1.18-.463-2.256-1.22-3.055L8 2.796l-3.28 3.19z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
