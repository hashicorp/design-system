import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconDiamondFill24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M10.057 1.925a2.751 2.751 0 013.888 0l8.132 8.132a2.752 2.752 0 010 3.888l-8.132 8.132a2.752 2.752 0 01-3.888 0l-8.132-8.132a2.751 2.751 0 010-3.888l8.132-8.132z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
