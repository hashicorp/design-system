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
                    d="M7.477 1.212a.75.75 0 011.046 0l3.813 3.71A5.92 5.92 0 0114 9.04C13.999 12.337 11.307 15 7.999 15c-3.308 0-6-2.663-6-5.96a5.92 5.92 0 011.665-4.118l3.812-3.71zM4.721 5.987A4.42 4.42 0 003.5 9.04C3.5 11.498 5.51 13.5 8 13.5s4.5-2.002 4.5-4.46a4.42 4.42 0 00-1.22-3.053L8 2.797l-3.28 3.19z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
