import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconShare24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M8.295 6.765a.75.75 0 11-1.09-1.03l4.25-4.5a.75.75 0 011.09 0l4.25 4.5a.75.75 0 01-1.09 1.03L12.75 3.636V14.25a.75.75 0 01-1.5 0V3.636L8.295 6.765z" />
                    <path d="M5.75 10.5c-.69 0-1.25.56-1.25 1.25v8.5c0 .69.56 1.25 1.25 1.25h12.5c.69 0 1.25-.56 1.25-1.25v-8.5c0-.69-.56-1.25-1.25-1.25H15.5a.75.75 0 010-1.5h2.75A2.75 2.75 0 0121 11.75v8.5A2.75 2.75 0 0118.25 23H5.75A2.75 2.75 0 013 20.25v-8.5A2.75 2.75 0 015.75 9H8.5a.75.75 0 010 1.5H5.75z" />
                </g>
            </svg>
        );
    }
);
