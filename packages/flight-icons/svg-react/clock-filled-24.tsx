import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconClockFilled24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zm-.25 4a.75.75 0 00-.75.75V12a.75.75 0 00.415.67l4.5 2.25a.75.75 0 00.67-1.34L12.5 11.535V5.75a.75.75 0 00-.75-.75z"
                />
            </svg>
        );
    }
);
