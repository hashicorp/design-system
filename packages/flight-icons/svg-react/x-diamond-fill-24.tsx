import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconXDiamondFill24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.945 1.884a2.75 2.75 0 0 0-3.89 0l-8.171 8.172a2.75 2.75 0 0 0 0 3.889l8.172 8.171a2.75 2.75 0 0 0 3.889 0l8.171-8.171a2.75 2.75 0 0 0 0-3.89zM8.22 8.22a.75.75 0 0 1 1.06 0L12 10.94l2.72-2.72a.75.75 0 1 1 1.06 1.06L13.06 12l2.72 2.72a.75.75 0 0 1-1.06 1.06L12 13.06l-2.72 2.72a.75.75 0 1 1-1.06-1.06L10.94 12 8.22 9.28a.75.75 0 0 1 0-1.06"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
