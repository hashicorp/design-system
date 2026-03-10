import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconFilterFill24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zm-1.25 15a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5zm-2.5-4a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5h-7.5zm-2.5-4a.75.75 0 000 1.5h12.5a.75.75 0 000-1.5H5.75z"
                />
            </svg>
        );
    }
);
