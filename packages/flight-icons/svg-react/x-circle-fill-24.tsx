import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconXCircleFill24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 1.25c5.937 0 10.75 4.813 10.75 10.75S17.937 22.75 12 22.75 1.25 17.937 1.25 12 6.063 1.25 12 1.25zm4.78 5.97a.75.75 0 00-1.06 0L12 10.94 8.28 7.22a.75.75 0 10-1.06 1.06L10.94 12l-3.72 3.72a.75.75 0 101.06 1.06L12 13.06l3.72 3.72a.75.75 0 101.06-1.06L13.06 12l3.72-3.72a.75.75 0 000-1.06z"
                />
            </svg>
        );
    }
);
