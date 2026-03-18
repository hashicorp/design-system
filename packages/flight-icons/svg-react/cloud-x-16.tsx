import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCloudX16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M3.932 1.373a6.04 6.04 0 0 1 6.239 1.28 6 6 0 0 1 1.505 2.285h.28c1.071 0 2.1.423 2.858 1.18a4.025 4.025 0 0 1-.665 6.238.75.75 0 0 1-.812-1.262q.225-.145.419-.336a2.524 2.524 0 0 0 0-3.578 2.55 2.55 0 0 0-1.8-.742h-.83a.75.75 0 0 1-.727-.562A4.5 4.5 0 0 0 9.14 3.74a4.541 4.541 0 0 0-4.688-.96 4.5 4.5 0 0 0-2.006 1.466 4.49 4.49 0 0 0 .386 5.942.75.75 0 0 1-1.055 1.066 5.982 5.982 0 0 1-.515-7.928 6 6 0 0 1 2.67-1.954" />
                    <path d="M10.78 9.22a.75.75 0 0 1 0 1.06L9.06 12l1.72 1.72a.75.75 0 1 1-1.06 1.06L8 13.06l-1.72 1.72a.75.75 0 0 1-1.06-1.06L6.94 12l-1.72-1.72a.75.75 0 1 1 1.06-1.06L8 10.94l1.72-1.72a.75.75 0 0 1 1.06 0" />
                </g>
            </svg>
        );
    }
);
