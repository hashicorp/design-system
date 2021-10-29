import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconReplicationDirect16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path
                        fillRule="evenodd"
                        d="M0 2.25A2.25 2.25 0 012.25 0h6.5A2.25 2.25 0 0111 2.25v8a.75.75 0 01-.75.75h-8A2.25 2.25 0 010 8.75v-6.5zm2.25-.75a.75.75 0 00-.75.75v6.5c0 .414.336.75.75.75H9.5V2.25a.75.75 0 00-.75-.75h-6.5z"
                        clipRule="evenodd"
                    />
                    <path d="M12.75 3.55a.7.7 0 01.7.7v8c0 .657-.53 1.2-1.197 1.2H4.25a.7.7 0 110-1.4h7.8v-7.8a.7.7 0 01.7-.7z" />
                    <path d="M15.95 6.75a.7.7 0 00-1.4 0v6.5c0 .718-.581 1.3-1.299 1.3h-6.5a.7.7 0 10-.001 1.4h6.501a2.699 2.699 0 002.699-2.7v-6.5z" />
                </g>
            </svg>
        );
    }
);
