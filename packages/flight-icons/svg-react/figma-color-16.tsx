import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconFigmaColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#1ABCFE"
                    d="M8.55 8c0-1.289 1.019-2.333 2.275-2.333S13.1 6.71 13.1 8c0 1.289-1.019 2.333-2.275 2.333S8.55 9.29 8.55 8z"
                />
                <path
                    fill="#0ACF83"
                    d="M4 12.667c0-1.289 1.019-2.334 2.275-2.334H8.55v2.334C8.55 13.955 7.531 15 6.275 15S4 13.955 4 12.667z"
                />
                <path
                    fill="#FF7262"
                    d="M8.55 1v4.667h2.275c1.257 0 2.275-1.045 2.275-2.334C13.1 2.045 12.082 1 10.825 1H8.55z"
                />
                <path
                    fill="#F24E1E"
                    d="M4 3.333c0 1.289 1.019 2.334 2.275 2.334H8.55V1H6.275C5.019 1 4 2.045 4 3.333z"
                />
                <path
                    fill="#A259FF"
                    d="M4 8c0 1.289 1.019 2.333 2.275 2.333H8.55V5.667H6.275C5.019 5.667 4 6.71 4 8z"
                />
            </svg>
        );
    }
);
