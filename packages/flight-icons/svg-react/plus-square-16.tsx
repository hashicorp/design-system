import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPlusSquare16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M7.75 4a.75.75 0 0 1 .75.75V7h2.25a.75.75 0 0 1 0 1.5H8.5v2.25a.75.75 0 0 1-1.5 0V8.5H4.75a.75.75 0 0 1 0-1.5H7V4.75A.75.75 0 0 1 7.75 4" />
                    <path
                        fillRule="evenodd"
                        d="M1 3.25A2.25 2.25 0 0 1 3.25 1h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9A2.25 2.25 0 0 1 1 12.25zm2.25-.75a.75.75 0 0 0-.75.75v9c0 .414.336.75.75.75h9a.75.75 0 0 0 .75-.75v-9a.75.75 0 0 0-.75-.75z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
