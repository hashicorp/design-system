import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconBottom24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M12 2a.75.75 0 01.75.75v12.638l4.96-5.158a.75.75 0 111.08 1.04l-6.25 6.5a.75.75 0 01-1.08 0l-6.25-6.5a.75.75 0 111.08-1.04l4.96 5.158V2.75A.75.75 0 0112 2zM3.75 20.5a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75z" />
                </g>
            </svg>
        );
    }
);
