import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconTerminalScreen16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="none"
                viewBox="0 0 16 16"
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <g fill={color}>
                    <path d="M3.924 5.02a.75.75 0 011.056-.096l3 2.5a.75.75 0 010 1.152l-3 2.5a.75.75 0 11-.96-1.152L6.328 8 4.02 6.076a.75.75 0 01-.096-1.056zM8.25 10.5a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" />
                    <path
                        fillRule="evenodd"
                        d="M0 3.25A2.25 2.25 0 012.25 1h11.5A2.25 2.25 0 0116 3.25v9.5A2.25 2.25 0 0113.75 15H2.25A2.25 2.25 0 010 12.75v-9.5zm2.25-.75a.75.75 0 00-.75.75v9.5c0 .414.336.75.75.75h11.5a.75.75 0 00.75-.75v-9.5a.75.75 0 00-.75-.75H2.25z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
