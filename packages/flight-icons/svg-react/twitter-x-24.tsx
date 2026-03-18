import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconTwitterX24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.712 10.622 20.413 3h-1.587l-5.819 6.618L8.36 3H3l7.027 10.007L3 21h1.588l6.145-6.989L15.64 21H21zM5.16 4.17H7.6l11.226 15.713h-2.439z"
                />
            </svg>
        );
    }
);
