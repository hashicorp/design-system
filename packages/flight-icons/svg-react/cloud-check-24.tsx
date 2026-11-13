import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCloudCheck24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M16.719 14.22a.75.75 0 1 1 1.06 1.06l-7.5 7.5a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 0 1 1.06-1.06l2.47 2.47zM8.025 1.046a8.9 8.9 0 0 1 4.152.57 8.9 8.9 0 0 1 3.436 2.412 9 9 0 0 1 1.802 3.16h.727a5.84 5.84 0 0 1 3.697 1.326 5.9 5.9 0 0 1 2.037 3.374 5.95 5.95 0 0 1-.527 3.91 5.88 5.88 0 0 1-2.859 2.705.75.75 0 0 1-.606-1.373 4.38 4.38 0 0 0 2.129-2.015c.46-.9.6-1.932.394-2.923a4.4 4.4 0 0 0-1.52-2.518 4.34 4.34 0 0 0-2.746-.986h-1.288a.75.75 0 0 1-.727-.565 7.5 7.5 0 0 0-1.639-3.104 7.4 7.4 0 0 0-2.86-2.007 7.37 7.37 0 0 0-6.733.691 7.5 7.5 0 0 0-2.4 2.55 7.563 7.563 0 0 0-.338 6.832 7.5 7.5 0 0 0 2.138 2.776.75.75 0 0 1-.941 1.168 9 9 0 0 1-2.566-3.334 9.06 9.06 0 0 1 .404-8.188 9 9 0 0 1 2.883-3.06 8.9 8.9 0 0 1 3.951-1.4"
                />
            </svg>
        );
    }
);
