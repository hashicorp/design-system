import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconFileChange24 = forwardRef<SVGSVGElement, IconProps>(
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
                <path
                    fill={color}
                    d="M13.336 1c.464 0 .91.185 1.237.513l5.914 5.914c.329.328.513.773.513 1.237V20.25A2.75 2.75 0 0 1 18.25 23H5.75A2.75 2.75 0 0 1 3 20.25V3.75A2.75 2.75 0 0 1 5.75 1zM5.75 2.5c-.69 0-1.25.56-1.25 1.25v16.5c0 .69.56 1.25 1.25 1.25h12.5c.69 0 1.25-.56 1.25-1.25V9h-5.75a.75.75 0 0 1-.75-.75V2.5zM8.8 13.19a2.62 2.62 0 0 1 1.773-.067c.653.2 1.312.644 1.979 1.37.547.594.99.85 1.313.95.31.094.561.061.779-.026.41-.165.68-.485.898-.744q.082-.099.156-.18a.75.75 0 0 1 1.104 1.015l-.012.014-.032.038-.019.023-.085.102a5 5 0 0 1-.326.357c-.262.26-.638.572-1.127.768a2.62 2.62 0 0 1-1.774.067c-.653-.2-1.312-.644-1.979-1.37-.547-.594-.99-.85-1.313-.95a1.12 1.12 0 0 0-.778.026c-.41.165-.68.485-.899.744a5 5 0 0 1-.156.18.75.75 0 1 1-1.092-1.028l.032-.04.019-.022.085-.102c.083-.1.193-.225.326-.357.262-.26.64-.572 1.128-.768m5.7-5.69h3.94L14.5 3.56z"
                />
            </svg>
        );
    }
);
