import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSend24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M18.956 2.795c1.4-.513 2.761.848 2.247 2.247l-5.782 15.694c-.486 1.317-2.25 1.553-3.067.412l-3.935-5.51a.273.273 0 00-.059-.059l-5.51-3.935c-1.142-.817-.905-2.58.413-3.067l15.693-5.782zm.518 1.408L3.781 9.985a.251.251 0 00-.06.438l5.13 3.663 5.617-5.616a.752.752 0 011.06 0 .753.753 0 010 1.06l-5.616 5.617 3.663 5.13a.252.252 0 00.439-.06l5.78-15.693a.25.25 0 00-.32-.32z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
