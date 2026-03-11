import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconLayout16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12.75 1A2.25 2.25 0 0115 3.25v9.5A2.25 2.25 0 0112.75 15h-9.5A2.25 2.25 0 011 12.75v-9.5A2.25 2.25 0 013.25 1h9.5zM2.5 12.75c0 .414.336.75.75.75H5v-7H2.5v6.25zm4 .75h6.25a.75.75 0 00.75-.75V6.5h-7v7zm-3.25-11a.75.75 0 00-.75.75V5h11V3.25a.75.75 0 00-.75-.75h-9.5z"
                />
            </svg>
        );
    }
);
