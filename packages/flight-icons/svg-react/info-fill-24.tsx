import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconInfoFill24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm-1 7a1 1 0 011-1h.01a1 1 0 110 2H12a1 1 0 01-1-1zm.25 3.25a.75.75 0 011.5 0v5.5a.75.75 0 01-1.5 0v-5.5z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
