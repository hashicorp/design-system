import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconChange24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M5.534 12.224q-.123.157-.219.269a.75.75 0 1 1-1.13-.986q.03-.036.097-.123c.308-.404 1.183-1.548 2.442-2.08a3.78 3.78 0 0 1 2.699-.106c1.003.324 2.05 1.056 3.142 2.31.98 1.122 1.81 1.652 2.473 1.866a2.28 2.28 0 0 0 1.654-.06c.837-.354 1.402-1.068 1.774-1.538q.123-.157.219-.269a.75.75 0 0 1 1.13.986q-.03.036-.097.123c-.308.404-1.183 1.548-2.442 2.08a3.78 3.78 0 0 1-2.699.106c-1.003-.324-2.05-1.056-3.142-2.31-.98-1.122-1.81-1.652-2.473-1.866a2.28 2.28 0 0 0-1.654.06c-.837.354-1.402 1.068-1.774 1.538"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
