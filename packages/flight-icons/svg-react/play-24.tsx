import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPlay24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M4 4.814C4 3.436 5.52 2.6 6.685 3.334l11.376 7.187a1.75 1.75 0 0 1 0 2.958L6.685 20.665C5.52 21.4 4 20.563 4 19.185zm1.884-.212a.25.25 0 0 0-.384.212v14.372a.25.25 0 0 0 .384.21l11.377-7.185a.25.25 0 0 0 0-.423z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
