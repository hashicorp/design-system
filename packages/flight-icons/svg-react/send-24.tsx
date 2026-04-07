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
                    d="M18.956 2.796c1.4-.514 2.762.847 2.247 2.247l-5.782 15.693c-.486 1.317-2.25 1.554-3.066.412l-3.936-5.51a.3.3 0 0 0-.059-.058l-5.51-3.935c-1.142-.817-.905-2.58.413-3.067zm.519 1.408L3.78 9.985a.251.251 0 0 0-.06.439l5.13 3.663 5.617-5.616a.75.75 0 0 1 1.06 0 .753.753 0 0 1 0 1.06l-5.616 5.616 3.663 5.13a.252.252 0 0 0 .439-.06l5.781-15.693a.25.25 0 0 0-.32-.32"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
