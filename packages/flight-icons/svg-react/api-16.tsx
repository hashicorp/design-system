import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconApi16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.25.5a2.25 2.25 0 11-.97 4.28l-1.345 1.345.285.284a2.25 2.25 0 010 3.182l-.285.284 1.345 1.345a2.25 2.25 0 11-1.06 1.06l-1.345-1.345-.284.285a2.25 2.25 0 01-3.182 0l-.284-.285L4.78 12.28a2.25 2.25 0 11-1.06-1.06l1.344-1.345-.284-.284a2.25 2.25 0 010-3.182l.284-.284L3.72 4.78a2.25 2.25 0 111.06-1.06l1.345 1.344.284-.284a2.25 2.25 0 013.182 0l.284.284L11.22 3.72A2.25 2.25 0 0113.25.5zm-10.5 12a.75.75 0 100 1.5.75.75 0 000-1.5zm10.5 0a.75.75 0 100 1.5.75.75 0 000-1.5zM8.53 5.84a.75.75 0 00-1.06 0L5.84 7.47a.75.75 0 000 1.06l1.63 1.63a.75.75 0 001.06 0l1.63-1.63a.75.75 0 000-1.06L8.53 5.84zM2.75 2a.75.75 0 100 1.5.75.75 0 000-1.5zm10.5 0a.75.75 0 100 1.5.75.75 0 000-1.5z"
                />
            </svg>
        );
    }
);
