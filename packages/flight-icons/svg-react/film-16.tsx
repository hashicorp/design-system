import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconFilm16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="none"
                viewBox="0 0 16 16"
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M2.25 0A2.25 2.25 0 000 2.25v11.5A2.25 2.25 0 002.25 16h11.5A2.25 2.25 0 0016 13.75V2.25A2.25 2.25 0 0013.75 0H2.25zM14.5 3.5V2.25a.75.75 0 00-.75-.75H12.5v2h2zm-2 1.5h2v2h-2V5zM11 1.5H5V7h6V1.5zm3.5 7v2h-2v-2h2zm0 3.5h-2v2.5h1.25a.75.75 0 00.75-.75V12zM11 8.5v6H5v-6h6zM1.5 12v1.75c0 .414.336.75.75.75H3.5V12h-2zm2-1.5h-2v-2h2v2zM1.5 7V5h2v2h-2zm0-3.5h2v-2H2.25a.75.75 0 00-.75.75V3.5z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
