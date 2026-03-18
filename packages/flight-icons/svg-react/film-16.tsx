import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconFilm16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.75 0A2.25 2.25 0 0 1 16 2.25v11.5A2.25 2.25 0 0 1 13.75 16H2.25A2.25 2.25 0 0 1 0 13.75V2.25A2.25 2.25 0 0 1 2.25 0zM1.5 13.75c0 .414.336.75.75.75H3.5V12h-2zm3.5.75h6v-6H5zm7.5 0h1.25a.75.75 0 0 0 .75-.75V12h-2zm-11-4h2v-2h-2zm11 0h2v-2h-2zM1.5 7h2V5h-2zM5 7h6V1.5H5zm7.5 0h2V5h-2zM2.25 1.5a.75.75 0 0 0-.75.75V3.5h2v-2zm10.25 2h2V2.25a.75.75 0 0 0-.75-.75H12.5z"
                />
            </svg>
        );
    }
);
