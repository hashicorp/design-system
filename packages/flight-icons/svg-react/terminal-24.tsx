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
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M20.25 18a.75.75 0 010 1.5h-8.5a.75.75 0 010-1.5h8.5zM3.174 4.27a.75.75 0 011.056-.096l7.5 6.25a.752.752 0 010 1.152l-7.5 6.25a.751.751 0 01-.96-1.152L10.078 11 3.27 5.326a.751.751 0 01-.096-1.056z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
