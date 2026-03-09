import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconTop24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 6c.204 0 .4.083.541.23l6.25 6.5a.75.75 0 01-1.082 1.04L12.75 8.611V21.25a.75.75 0 01-1.5 0V8.612L6.291 13.77a.75.75 0 01-1.082-1.04l6.25-6.5A.751.751 0 0112 6zm8.25-4a.75.75 0 010 1.5H3.75a.75.75 0 010-1.5h16.5z"
                />
            </svg>
        );
    }
);
