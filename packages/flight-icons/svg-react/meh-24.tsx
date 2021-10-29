import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMeh24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M8 14.5A.75.75 0 008 16h8a.75.75 0 000-1.5H8zM8 9a1 1 0 011-1h.01a1 1 0 110 2H9a1 1 0 01-1-1zM15 8a1 1 0 100 2h.01a1 1 0 100-2H15z" />
                    <path
                        fillRule="evenodd"
                        d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
