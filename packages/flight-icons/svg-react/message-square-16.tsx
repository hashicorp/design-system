import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMessageSquare16 = forwardRef<SVGSVGElement, IconProps>(
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
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M12.75 1A2.25 2.25 0 0 1 15 3.25v6.5A2.25 2.25 0 0 1 12.75 12H5.571a.75.75 0 0 0-.51.2L2.26 14.8A.75.75 0 0 1 1 14.25v-11A2.25 2.25 0 0 1 3.25 1zm-9.5 1.5a.75.75 0 0 0-.75.75v9.281l1.541-1.43a2.25 2.25 0 0 1 1.53-.601h7.179a.75.75 0 0 0 .75-.75v-6.5a.75.75 0 0 0-.75-.75z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
