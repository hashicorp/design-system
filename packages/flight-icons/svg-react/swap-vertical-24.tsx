import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSwapVertical24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M14.75 11c.412.002.75.337.75.75v8.613l2.954-3.128a.753.753 0 011.06-.03.754.754 0 01.03 1.06l-4.25 4.5a.76.76 0 01-.544.235.759.759 0 01-.546-.235l-4.25-4.5a.75.75 0 011.09-1.03L14 20.363V11.75a.75.75 0 01.75-.75zM9.25 1a.76.76 0 01.545.235l4.25 4.5c.282.3.268.776-.03 1.06a.753.753 0 01-1.06-.03L10 3.637v8.613a.75.75 0 01-1.5 0V3.637L5.545 6.765a.75.75 0 01-1.09-1.03l4.25-4.5A.759.759 0 019.25 1z"
                />
            </svg>
        );
    }
);
