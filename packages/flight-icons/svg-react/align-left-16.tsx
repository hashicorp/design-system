import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAlignLeft16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M11.25 12a.75.75 0 010 1.5h-9.5a.75.75 0 010-1.5h9.5zm3-3a.75.75 0 010 1.5H1.75a.75.75 0 010-1.5h12.5zm-3-3a.75.75 0 010 1.5h-9.5a.75.75 0 010-1.5h9.5zm3-3a.75.75 0 010 1.5H1.75a.75.75 0 010-1.5h12.5z"
                />
            </svg>
        );
    }
);
