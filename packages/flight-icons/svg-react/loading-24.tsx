import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconLoading24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color} fillRule="evenodd" clipRule="evenodd">
                    <path
                        d="M12 2.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19zM1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12z"
                        opacity={0.2}
                    />
                    <path d="M11.25 1.75A.75.75 0 0112 1c6.075 0 11 4.925 11 11a.75.75 0 01-1.5 0A9.5 9.5 0 0012 2.5a.75.75 0 01-.75-.75z" />
                </g>
            </svg>
        );
    }
);
