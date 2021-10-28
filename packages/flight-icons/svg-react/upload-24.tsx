import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconUpload24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M6.232 8.793a.75.75 0 001.06-.025l3.958-4.146V15.25a.75.75 0 001.5 0V4.622l3.957 4.146a.75.75 0 001.085-1.036l-5.25-5.5a.747.747 0 00-1.086.001l-5.249 5.5a.75.75 0 00.025 1.06z" />
                    <path d="M2.75 14a.75.75 0 01.75.75v4.5c0 .69.56 1.25 1.25 1.25h14.5c.69 0 1.25-.56 1.25-1.25v-4.5a.75.75 0 011.5 0v4.5A2.75 2.75 0 0119.25 22H4.75A2.75 2.75 0 012 19.25v-4.5a.75.75 0 01.75-.75z" />
                </g>
            </svg>
        );
    }
);
