import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconExternalLink16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
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
                <g fill={color}>
                    <path d="M9 .75A.75.75 0 019.75 0h4.5c.206 0 .393.083.529.218l.001.002.002.001A.748.748 0 0115 .75v4.5a.75.75 0 01-1.5 0V2.56L7.28 8.78a.75.75 0 01-1.06-1.06l6.22-6.22H9.75A.75.75 0 019 .75z" />
                    <path d="M3.25 3.5a.75.75 0 00-.75.75v7.5c0 .414.336.75.75.75h7.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0110.75 14h-7.5A2.25 2.25 0 011 11.75v-7.5A2.25 2.25 0 013.25 2h4a.75.75 0 010 1.5h-4z" />
                </g>
            </svg>
        );
    }
);
