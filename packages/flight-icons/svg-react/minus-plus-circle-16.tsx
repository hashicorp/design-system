import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMinusPlusCircle16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M3.75 4.5a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5zM10.25 7.5a.75.75 0 0 1 .75.75V9.5h1.25a.75.75 0 0 1 0 1.5H11v1.25a.75.75 0 0 1-1.5 0V11H8.25a.75.75 0 0 1 0-1.5H9.5V8.25a.75.75 0 0 1 .75-.75" />
                    <path
                        fillRule="evenodd"
                        d="M5.25 0a5.25 5.25 0 0 1 5.244 5.006 5.25 5.25 0 1 1-5.488 5.488A5.25 5.25 0 0 1 5.25 0M1.5 5.25a3.75 3.75 0 0 1 7.499-.1A5.26 5.26 0 0 0 5.15 8.999 3.75 3.75 0 0 1 1.5 5.25m8.75 1.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
