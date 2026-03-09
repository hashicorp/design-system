import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCode24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.526 3.553a.751.751 0 011.448.394l-4.5 16.5a.75.75 0 01-1.448-.394l4.5-16.5zM6.732 6.208a.75.75 0 011.035 1.085L2.837 12l4.932 4.708a.75.75 0 01-1.036 1.085l-5.5-5.25a.753.753 0 010-1.085l5.5-5.25zm9.475.024a.751.751 0 011.06-.024l5.5 5.25a.752.752 0 010 1.085l-5.5 5.25a.75.75 0 01-1.035-1.085L21.164 12l-4.932-4.707a.75.75 0 01-.025-1.06z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
