import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconCalendar16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
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
                    fillRule="evenodd"
                    d="M11.5.75a.75.75 0 00-1.5 0V1H6V.75a.75.75 0 00-1.5 0V1H3.25A2.25 2.25 0 001 3.25v9.5A2.25 2.25 0 003.25 15h9.5A2.25 2.25 0 0015 12.75v-9.5A2.25 2.25 0 0012.75 1H11.5V.75zm-7 2.5V2.5H3.25a.75.75 0 00-.75.75V5h11V3.25a.75.75 0 00-.75-.75H11.5v.75a.75.75 0 01-1.5 0V2.5H6v.75a.75.75 0 01-1.5 0zm9 3.25h-11v6.25c0 .414.336.75.75.75h9.5a.75.75 0 00.75-.75V6.5z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
