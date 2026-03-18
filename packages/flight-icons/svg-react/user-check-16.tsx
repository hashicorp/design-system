import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconUserCheck16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M7.75 10a3.75 3.75 0 0 1 3.75 3.75v.5a.75.75 0 0 1-1.5 0v-.5a2.25 2.25 0 0 0-2.25-2.25h-3.5A2.25 2.25 0 0 0 2 13.75v.5a.75.75 0 0 1-1.5 0v-.5A3.75 3.75 0 0 1 4.25 10zm5.97-3.78a.75.75 0 1 1 1.06 1.06l-2.5 2.5a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47zM6 2a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7m0 1.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4"
                />
            </svg>
        );
    }
);
