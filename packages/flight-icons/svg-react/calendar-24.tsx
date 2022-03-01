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
                    fillRule="evenodd"
                    d="M17 1a.75.75 0 00-1.5 0v1h-7V1A.75.75 0 007 1v1H4.75A2.75 2.75 0 002 4.75v14.5A2.75 2.75 0 004.75 22h14.5A2.75 2.75 0 0022 19.25V4.75A2.75 2.75 0 0019.25 2H17V1zm3.5 7V4.75c0-.69-.56-1.25-1.25-1.25H17V5a.75.75 0 01-1.5 0V3.5h-7V5A.75.75 0 017 5V3.5H4.75c-.69 0-1.25.56-1.25 1.25V8h17zm-17 1.5h17v9.75c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25V9.5z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
