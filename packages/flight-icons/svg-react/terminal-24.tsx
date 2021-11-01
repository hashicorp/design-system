import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconTerminal24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M4.23 4.174a.75.75 0 00-.96 1.152L10.078 11 3.27 16.674a.75.75 0 10.96 1.152l7.5-6.25a.75.75 0 000-1.152l-7.5-6.25zM11.75 18a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5z" />
                </g>
            </svg>
        );
    }
);
