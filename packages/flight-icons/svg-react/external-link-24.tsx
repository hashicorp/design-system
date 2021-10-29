import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconExternalLink24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M15 1.75a.75.75 0 01.75-.75h5.5a.748.748 0 01.75.75v5.5a.75.75 0 01-1.5 0V3.56L10.28 13.78a.75.75 0 11-1.06-1.06L19.44 2.5h-3.69a.75.75 0 01-.75-.75z" />
                    <path d="M4.75 5.5c-.69 0-1.25.56-1.25 1.25v11.5c0 .69.56 1.25 1.25 1.25h11.5c.69 0 1.25-.56 1.25-1.25v-6.5a.75.75 0 011.5 0v6.5A2.75 2.75 0 0116.25 21H4.75A2.75 2.75 0 012 18.25V6.75A2.75 2.75 0 014.75 4h6.5a.75.75 0 010 1.5h-6.5z" />
                </g>
            </svg>
        );
    }
);
