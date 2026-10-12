import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconZap16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8.48.255A.75.75 0 0 1 9.376.08.754.754 0 0 1 9.78.9L8.89 5.317l5.484.909a.75.75 0 0 1 .584.487.76.76 0 0 1-.143.748l-7.292 8.285a.754.754 0 0 1-.896.177.754.754 0 0 1-.402-.82l.889-4.417-5.485-.91a.76.76 0 0 1-.584-.488.75.75 0 0 1 .144-.747zM3.207 8.518l4.917.814a.756.756 0 0 1 .612.888l-.489 2.433 4.548-5.168-4.916-.816a.76.76 0 0 1-.495-.313.76.76 0 0 1-.118-.574l.49-2.432z"
                />
            </svg>
        );
    }
);
