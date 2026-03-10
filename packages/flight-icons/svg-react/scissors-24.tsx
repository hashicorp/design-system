import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconScissors24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M5.5 2a3.5 3.5 0 013.013 5.283l3.424 3.192L19.738 3.2A.75.75 0 0120.762 4.3l-8.31 7.746-.01.009-3.93 3.663A3.5 3.5 0 117.49 14.62l3.348-3.12-3.348-3.12A3.5 3.5 0 115.5 2zm8.702 11.587a.75.75 0 011.06-.034l5.5 5.15a.75.75 0 01-1.025 1.095l-5.5-5.15a.75.75 0 01-.035-1.061zM5.5 15.5a2 2 0 100 4 2 2 0 000-4zm0-12a2 2 0 100 4 2 2 0 000-4z"
                />
            </svg>
        );
    }
);
