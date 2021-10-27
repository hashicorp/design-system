import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconCreditCard24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <g fill={color}>
                    <path d="M4.75 15a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5z" />
                    <path
                        fillRule="evenodd"
                        d="M0 5.75A2.75 2.75 0 012.75 3h18.5A2.75 2.75 0 0124 5.75v12.5A2.75 2.75 0 0121.25 21H2.75A2.75 2.75 0 010 18.25V5.75zm22.5 0V8h-21V5.75c0-.69.56-1.25 1.25-1.25h18.5c.69 0 1.25.56 1.25 1.25zm0 5.25h-21v7.25c0 .69.56 1.25 1.25 1.25h18.5c.69 0 1.25-.56 1.25-1.25V11z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
