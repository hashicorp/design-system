import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCalendar24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M16.25.25A.75.75 0 0 1 17 1v1h2.25A2.75 2.75 0 0 1 22 4.75v14.5A2.75 2.75 0 0 1 19.25 22H4.75A2.75 2.75 0 0 1 2 19.25V4.75A2.75 2.75 0 0 1 4.75 2H7V1a.75.75 0 0 1 1.5 0v1h7V1a.75.75 0 0 1 .75-.75m-12.75 19c0 .69.56 1.25 1.25 1.25h14.5c.69 0 1.25-.56 1.25-1.25V9.5h-17zM4.75 3.5c-.69 0-1.25.56-1.25 1.25V8h17V4.75c0-.69-.56-1.25-1.25-1.25H17V5a.75.75 0 0 1-1.5 0V3.5h-7V5A.75.75 0 0 1 7 5V3.5z"
                />
            </svg>
        );
    }
);
