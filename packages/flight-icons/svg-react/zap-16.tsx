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
                    fillRule="evenodd"
                    d="M8.48.255a.753.753 0 01.896-.176.754.754 0 01.403.82L8.89 5.317l5.484.909a.754.754 0 01.584.487.756.756 0 01-.143.748l-7.292 8.285a.754.754 0 01-.896.177.753.753 0 01-.402-.82l.889-4.417-5.485-.91a.755.755 0 01-.584-.488.753.753 0 01.144-.747L8.479.255zM3.207 8.518l4.917.814a.756.756 0 01.612.888l-.489 2.432 4.548-5.168L7.88 6.67a.758.758 0 01-.495-.313.756.756 0 01-.118-.575l.49-2.431-4.549 5.168z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
