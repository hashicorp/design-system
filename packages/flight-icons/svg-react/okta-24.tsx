import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconOkta24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 2C6.49 2 2 6.458 2 12s4.459 10 10 10 10-4.459 10-10S17.51 2 12 2zm0 15c-2.77 0-5-2.23-5-5s2.23-5 5-5 5 2.23 5 5-2.23 5-5 5z"
                />
            </svg>
        );
    }
);
