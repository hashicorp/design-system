import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSquare24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M19.25 2A2.75 2.75 0 0 1 22 4.75v14.5A2.75 2.75 0 0 1 19.25 22H4.75A2.75 2.75 0 0 1 2 19.25V4.75A2.75 2.75 0 0 1 4.75 2zM4.75 3.5c-.69 0-1.25.56-1.25 1.25v14.5c0 .69.56 1.25 1.25 1.25h14.5c.69 0 1.25-.56 1.25-1.25V4.75c0-.69-.56-1.25-1.25-1.25z"
                />
            </svg>
        );
    }
);
