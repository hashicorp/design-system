import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconMessageSquare24 = forwardRef<SVGSVGElement, IconProps>(
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
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M22 4.75A2.75 2.75 0 0019.25 2H4.75A2.75 2.75 0 002 4.75v16.5a.75.75 0 001.231.575l4.228-3.534A1.25 1.25 0 018.26 18h10.99A2.75 2.75 0 0022 15.25V4.75zM19.25 3.5c.69 0 1.25.56 1.25 1.25v10.5c0 .69-.56 1.25-1.25 1.25H8.26a2.75 2.75 0 00-1.763.64L3.5 19.645V4.75c0-.69.56-1.25 1.25-1.25h14.5z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
