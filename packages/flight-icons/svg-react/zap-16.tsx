import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconZap16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8.48.255a.75.75 0 0 1 .897-.176.754.754 0 0 1 .402.82L8.89 5.315l5.485.91a.76.76 0 0 1 .584.487.76.76 0 0 1-.144.748l-7.292 8.285a.754.754 0 0 1-.896.177.75.75 0 0 1-.402-.82l.889-4.417-5.485-.91a.752.752 0 0 1-.44-1.235zM3.208 8.517l4.917.815c.199.034.379.148.494.314a.76.76 0 0 1 .118.574l-.49 2.432 4.549-5.168-4.917-.815a.76.76 0 0 1-.495-.314.76.76 0 0 1-.118-.574l.49-2.431z"
                />
            </svg>
        );
    }
);
