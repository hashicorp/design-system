import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconFiles24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M10.129 1a2.25 2.25 0 0 1 1.59.66l3.622 3.62q.226.227.378.502a.75.75 0 0 1 .311.188l2.31 2.31q.227.227.379.502a.75.75 0 0 1 .311.188l2.31 2.31c.423.422.66.994.66 1.591v7.879A2.25 2.25 0 0 1 19.75 23h-8.5A2.25 2.25 0 0 1 9 20.75V20h-.75A2.25 2.25 0 0 1 6 17.75V17h-.75A2.25 2.25 0 0 1 3 14.75V3.25A2.25 2.25 0 0 1 5.25 1zM19 17.75A2.25 2.25 0 0 1 16.75 20H10.5v.75c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-7.879a.75.75 0 0 0-.22-.53L19 11.06zm-3-3A2.25 2.25 0 0 1 13.75 17H7.5v.75c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75V9.871a.75.75 0 0 0-.22-.53L16 8.06zM5.25 2.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75V7h-3.75a.75.75 0 0 1-.75-.75V2.5zm6.25 3h1.94L11.5 3.56z"
                />
            </svg>
        );
    }
);
