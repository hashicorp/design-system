import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMapPin16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 0c3.862 0 7 3.114 7 6.964a6.929 6.929 0 01-2.052 4.927l-.033.03-4.419 3.892a.751.751 0 01-.992 0L3.085 11.92l-.033-.03A6.929 6.929 0 011 6.964C1 3.114 4.138 0 8 0zm0 1.5c-3.041 0-5.5 2.45-5.5 5.464 0 1.5.607 2.859 1.594 3.848L8 14.25l3.906-3.44A5.428 5.428 0 0013.5 6.965C13.5 3.95 11.041 1.5 8 1.5zm0 3a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM8 6a1 1 0 100 2 1 1 0 000-2z"
                />
            </svg>
        );
    }
);
