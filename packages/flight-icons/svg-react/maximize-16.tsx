import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMaximize16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M5.47 9.47a.75.75 0 1 1 1.06 1.06L3.56 13.5h2.19a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75v-4a.75.75 0 0 1 1.5 0v2.19zM14.25 1a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V3.56l-2.97 2.97a.75.75 0 1 1-1.06-1.06l2.97-2.97h-2.19a.75.75 0 0 1 0-1.5z"
                />
            </svg>
        );
    }
);
