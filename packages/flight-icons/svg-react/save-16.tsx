import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSave16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M10.129 1a2.25 2.25 0 0 1 1.59.66l2.622 2.62c.422.422.659.994.659 1.591v6.879A2.25 2.25 0 0 1 12.75 15h-9.5A2.25 2.25 0 0 1 1 12.75v-9.5A2.25 2.25 0 0 1 3.25 1zM3.25 2.5a.75.75 0 0 0-.75.75v9.5c0 .414.336.75.75.75h.8V9.25a1.2 1.2 0 0 1 1.2-1.2h5.5a1.2 1.2 0 0 1 1.2 1.2v4.25h.8a.75.75 0 0 0 .75-.75V5.871a.75.75 0 0 0-.22-.53L10.66 2.72a.75.75 0 0 0-.531-.22H5.45v2.05h3.8a.7.7 0 0 1 0 1.4h-4a1.2 1.2 0 0 1-1.2-1.2V2.5zm2.2 11h5.1V9.45h-5.1z"
                />
            </svg>
        );
    }
);
