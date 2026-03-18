import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCreditCard24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M21.25 3A2.75 2.75 0 0 1 24 5.75v12.5A2.75 2.75 0 0 1 21.25 21H2.75A2.75 2.75 0 0 1 0 18.25V5.75A2.75 2.75 0 0 1 2.75 3zM1.5 18.25c0 .69.56 1.25 1.25 1.25h18.5c.69 0 1.25-.56 1.25-1.25V11h-21zM7.25 15a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1 0-1.5zM2.75 4.5c-.69 0-1.25.56-1.25 1.25V8h21V5.75c0-.69-.56-1.25-1.25-1.25z"
                />
            </svg>
        );
    }
);
