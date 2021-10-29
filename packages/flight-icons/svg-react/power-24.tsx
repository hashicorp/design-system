import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconPower24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
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
                <g fill={color}>
                    <path d="M12.5 2A.75.75 0 0011 2v10a.75.75 0 001.5 0V2z" />
                    <path d="M5.562 7.293a.75.75 0 10-1.124-.992A9.716 9.716 0 002 12.75c0 5.385 4.365 9.75 9.75 9.75s9.75-4.365 9.75-9.75a9.716 9.716 0 00-2.438-6.45.75.75 0 10-1.124.993 8.25 8.25 0 11-12.375 0z" />
                </g>
            </svg>
        );
    }
);
