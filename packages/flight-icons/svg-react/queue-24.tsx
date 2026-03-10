import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconQueue24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M21.249 16.999a.751.751 0 010 1.5h-12.5a.751.751 0 010-1.5h12.5zm0-5a.751.751 0 010 1.5h-12.5a.751.751 0 010-1.5h12.5zM2.142 4.061a.75.75 0 011.046-.17l4.5 3.25a.751.751 0 010 1.216l-4.5 3.25a.75.75 0 01-.877-1.215l3.658-2.643L2.31 5.107a.75.75 0 01-.17-1.046zm19.107 2.938a.75.75 0 010 1.5h-9.5a.751.751 0 010-1.5h9.5z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
