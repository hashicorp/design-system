import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconFileText24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M7.75 12a.75.75 0 000 1.5h8a.75.75 0 000-1.5h-8zM7 16.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zM7.75 8a.75.75 0 000 1.5h2a.75.75 0 000-1.5h-2z" />
                    <path
                        fillRule="evenodd"
                        d="M3 3.75A2.75 2.75 0 015.75 1h7.586c.464 0 .909.184 1.237.513l5.914 5.914c.329.328.513.773.513 1.237V20.25A2.75 2.75 0 0118.25 23H5.75A2.75 2.75 0 013 20.25V3.75zM5.75 2.5c-.69 0-1.25.56-1.25 1.25v16.5c0 .69.56 1.25 1.25 1.25h12.5c.69 0 1.25-.56 1.25-1.25V9h-5.75a.75.75 0 01-.75-.75V2.5H5.75zm8.75 1.06l3.94 3.94H14.5V3.56z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
