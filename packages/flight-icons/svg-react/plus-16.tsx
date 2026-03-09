import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPlus16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8.25 2.75A.75.75 0 019 3.5V7h3.5a.75.75 0 010 1.5H9V12a.75.75 0 01-1.5 0V8.5H4A.75.75 0 014 7h3.5V3.5a.75.75 0 01.75-.75z"
                />
            </svg>
        );
    }
);
