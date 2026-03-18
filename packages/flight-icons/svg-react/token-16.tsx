import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconToken16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M6.5 0a6.5 6.5 0 0 1 5.846 3.654 6.5 6.5 0 1 1-8.692 8.692A6.5 6.5 0 0 1 6.5 0m6.473 5.902Q13 6.198 13 6.5a6.5 6.5 0 0 1-7.098 6.473 5 5 0 1 0 7.07-7.07M6.5 1.5a5 5 0 1 0 0 10 5 5 0 0 0 0-10m-.709 1.818c.39-.39 1.025-.39 1.415 0l2.475 2.475a1 1 0 0 1 0 1.414L7.206 9.682a1 1 0 0 1-1.415 0L3.316 7.207a1 1 0 0 1 0-1.414zM4.731 6.5l1.767 1.768L8.267 6.5 6.498 4.732z"
                />
            </svg>
        );
    }
);
