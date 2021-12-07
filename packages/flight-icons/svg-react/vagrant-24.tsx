import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconVagrant24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M19.983.6l-4.96 2.877v1.767L12 12.384l-3.023-7.14V3.477L4.017.6 1 2.352v2.034l6.719 16.532L12 23.4l4.281-2.482L23 4.386V2.352L19.983.6z"
                />
            </svg>
        );
    }
);
