import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconChangeSquare16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = useMemo(
            () =>
                title
                    ? 'title-' + Math.random().toString(36).substr(2, 9)
                    : undefined,
            [title]
        );
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
                    <path d="M8.586 7.532c.477.597.864.834 1.135.92a.94.94 0 0 0 .69-.04c.228-.1.442-.27.627-.458.09-.09.168-.18.234-.257l.03-.036c.048-.058.12-.143.17-.193a.75.75 0 0 1 1.062 1.06l-.023.026-.025.03-.07.082a6 6 0 0 1-.312.344c-.253.256-.623.572-1.095.778a2.43 2.43 0 0 1-1.743.094c-.64-.204-1.257-.67-1.852-1.414-.477-.597-.864-.834-1.135-.92a.94.94 0 0 0-.69.04c-.228.1-.442.27-.627.458-.09.09-.168.18-.234.257l-.03.036a3 3 0 0 1-.17.193.75.75 0 0 1-1.063-1.057l.001-.002.023-.027.025-.03.07-.082c.077-.092.183-.214.312-.344.253-.256.623-.572 1.095-.777a2.43 2.43 0 0 1 1.743-.095c.64.204 1.257.67 1.852 1.414" />
                    <path
                        fillRule="evenodd"
                        d="M3.25 1A2.25 2.25 0 0 0 1 3.25v9.5A2.25 2.25 0 0 0 3.25 15h9.5A2.25 2.25 0 0 0 15 12.75v-9.5A2.25 2.25 0 0 0 12.75 1zM2.5 3.25a.75.75 0 0 1 .75-.75h9.5a.75.75 0 0 1 .75.75v9.5a.75.75 0 0 1-.75.75h-9.5a.75.75 0 0 1-.75-.75z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
