import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconExitPoint16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M7 2c.896 0 1.749.197 2.515.55a.75.75 0 1 1-.63 1.362 4.5 4.5 0 1 0 0 8.176.75.75 0 0 1 .63 1.361A6 6 0 1 1 7 2m4.245 2.695a.75.75 0 0 1 1.06.05l2.498 2.748A.75.75 0 0 1 15 8v.025a.75.75 0 0 1-.196.48l-2.5 2.75a.75.75 0 0 1-1.109-1.01l1.36-1.495H6.75a.75.75 0 0 1 0-1.5h5.805l-1.36-1.495a.75.75 0 0 1 .05-1.06"
                />
            </svg>
        );
    }
);
