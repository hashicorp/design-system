import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconBattery24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path
                        fillRule="evenodd"
                        d="M3.75 5A2.75 2.75 0 001 7.75v8.5A2.75 2.75 0 003.75 19h14.5A2.75 2.75 0 0021 16.25v-8.5A2.75 2.75 0 0018.25 5H3.75zM2.5 7.75c0-.69.56-1.25 1.25-1.25h14.5c.69 0 1.25.56 1.25 1.25v8.5c0 .69-.56 1.25-1.25 1.25H3.75c-.69 0-1.25-.56-1.25-1.25v-8.5z"
                        clipRule="evenodd"
                    />
                    <path d="M23.5 10.75a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5z" />
                </g>
            </svg>
        );
    }
);
