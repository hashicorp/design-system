import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSyncReverse24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M2.75 11.25a.75.75 0 0 1 .75.75 8.5 8.5 0 0 0 14.981 5.5H15.75a.75.75 0 0 1 0-1.5h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-2.636A9.98 9.98 0 0 1 12 22C6.477 22 2 17.523 2 12a.75.75 0 0 1 .75-.75M12 2c5.523 0 10 4.477 10 10a.75.75 0 0 1-1.5 0A8.5 8.5 0 0 0 5.519 6.5H8.25a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 3 7.25v-4.5a.75.75 0 0 1 1.5 0v2.636A9.98 9.98 0 0 1 12 2"
                />
            </svg>
        );
    }
);
