import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSignOut24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8.75 2a.75.75 0 0 1 0 1.5h-4c-.69 0-1.25.56-1.25 1.25v14.5c0 .69.56 1.25 1.25 1.25h4a.75.75 0 0 1 0 1.5h-4A2.75 2.75 0 0 1 2 19.25V4.75A2.75 2.75 0 0 1 4.75 2zm6.72 4.22a.75.75 0 0 1 1.06 0l5 5a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 1 1-1.06-1.06l3.72-3.72H9A.75.75 0 0 1 9 11h10.19l-3.72-3.72a.75.75 0 0 1 0-1.06"
                />
            </svg>
        );
    }
);
