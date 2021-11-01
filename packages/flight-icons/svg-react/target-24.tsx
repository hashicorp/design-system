import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconTarget24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color} fillRule="evenodd" clipRule="evenodd">
                    <path d="M12 9a3 3 0 100 6 3 3 0 000-6zm-1.5 3a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                    <path d="M5 12a7 7 0 1114 0 7 7 0 01-14 0zm7-5.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11z" />
                    <path d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm11-9.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19z" />
                </g>
            </svg>
        );
    }
);
