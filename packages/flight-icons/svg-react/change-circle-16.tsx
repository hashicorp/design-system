import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconChangeCircle16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M8.586 7.532c.477.597.864.834 1.135.92a.936.936 0 00.69-.04c.228-.1.442-.27.627-.458.09-.09.168-.18.234-.257l.03-.036c.048-.058.12-.143.17-.193a.75.75 0 011.062 1.06l-.023.026-.025.03-.07.082a5.846 5.846 0 01-.312.344c-.253.256-.623.572-1.095.778a2.434 2.434 0 01-1.743.094c-.64-.204-1.257-.67-1.852-1.414-.477-.597-.864-.834-1.135-.92a.936.936 0 00-.69.04c-.228.1-.442.27-.627.458-.09.09-.168.18-.234.257l-.03.036a3.3 3.3 0 01-.17.193.75.75 0 01-1.063-1.057l.024-.03.025-.028.07-.083c.077-.092.183-.214.312-.344.253-.256.623-.572 1.095-.777a2.434 2.434 0 011.743-.095c.64.204 1.257.67 1.852 1.414z" />
                    <path
                        fillRule="evenodd"
                        d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
