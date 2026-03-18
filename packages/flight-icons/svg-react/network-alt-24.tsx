import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconNetworkAlt24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M6.732 6.207a.75.75 0 0 1 1.036 1.085L2.836 12l4.932 4.707c.299.286.31.761.025 1.06a.75.75 0 0 1-1.06.025l-5.5-5.25a.75.75 0 0 1 0-1.085zm9.475.025a.75.75 0 0 1 1.06-.025l5.5 5.25a.753.753 0 0 1 0 1.085l-5.5 5.25a.75.75 0 0 1-1.06-.024.75.75 0 0 1 .025-1.061L21.164 12l-4.932-4.708a.75.75 0 0 1-.025-1.06M8.01 11a1 1 0 1 1 0 2H8a1 1 0 0 1 0-2zm4 0a1 1 0 0 1 0 2H12a1 1 0 0 1 0-2zm4 0a1 1 0 0 1 0 2H16a1 1 0 0 1 0-2z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
