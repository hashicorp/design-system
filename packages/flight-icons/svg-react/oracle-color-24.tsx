import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconOracleColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#EA1B22"
                    fillRule="evenodd"
                    d="M2 12c0 3.48 2.832 6.3 6.326 6.3h7.348C19.168 18.3 22 15.48 22 12s-2.832-6.3-6.326-6.3H8.326C4.832 5.7 2 8.52 2 12zm17.61 0a4.086 4.086 0 01-4.095 4.078H8.489a4.086 4.086 0 01-4.095-4.077A4.086 4.086 0 018.49 7.923h7.026a4.086 4.086 0 014.094 4.078z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
