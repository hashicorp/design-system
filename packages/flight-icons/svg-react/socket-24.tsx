import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSocket24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M9 12a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H10a1 1 0 0 1-1-1M14.01 11a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2z" />
                    <path
                        fillRule="evenodd"
                        d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16m-6.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0"
                        clipRule="evenodd"
                    />
                    <path
                        fillRule="evenodd"
                        d="M3.75 1A2.75 2.75 0 0 0 1 3.75v16.5A2.75 2.75 0 0 0 3.75 23h16.5A2.75 2.75 0 0 0 23 20.25V3.75A2.75 2.75 0 0 0 20.25 1zM2.5 3.75c0-.69.56-1.25 1.25-1.25h16.5c.69 0 1.25.56 1.25 1.25v16.5c0 .69-.56 1.25-1.25 1.25H3.75c-.69 0-1.25-.56-1.25-1.25z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
