import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMicOff24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M1.22 1.22a.751.751 0 011.06 0l20.5 20.5a.751.751 0 01-1.06 1.06l-4.726-4.725a8.15 8.15 0 01-4.244 1.66V22H16c.413.001.75.336.75.75a.752.752 0 01-.75.75H8A.75.75 0 018 22h3.25v-2.284a8.115 8.115 0 01-4.898-2.227A7.63 7.63 0 014 12v-2a.75.75 0 011.5 0v2a6.13 6.13 0 001.894 4.41A6.637 6.637 0 0012 18.25a6.678 6.678 0 003.923-1.267l-1.66-1.66A4.111 4.111 0 0112 16a4.08 4.08 0 01-2.816-1.118A3.79 3.79 0 018 12.142V9.062L1.22 2.28a.75.75 0 010-1.061zm18.03 8.03c.413.001.75.336.75.75v2c0 .69-.095 1.37-.277 2.024a.75.75 0 01-1.445-.403A6.03 6.03 0 0018.5 12v-2a.75.75 0 01.75-.75zM9.5 12.143c0 .614.254 1.21.72 1.655A2.582 2.582 0 0012 14.5c.412 0 .813-.096 1.167-.273L9.5 10.56v1.583zM12 0c1.05 0 2.064.4 2.816 1.118A3.793 3.793 0 0116 3.858v6.5a.75.75 0 01-1.5 0v-6.5c0-.614-.256-1.211-.72-1.656A2.581 2.581 0 0012 1.5c-.673 0-1.314.257-1.78.702a2.29 2.29 0 00-.72 1.655.75.75 0 01-1.5 0 3.79 3.79 0 011.184-2.739A4.08 4.08 0 0112 0z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
