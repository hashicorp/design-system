import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPlay16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M3 3.814C3 2.436 4.52 1.6 5.685 2.334l6.627 4.186a1.75 1.75 0 0 1 0 2.96l-6.627 4.185C4.52 14.4 3 13.563 3 12.185zm1.884-.212a.25.25 0 0 0-.384.212v8.371a.25.25 0 0 0 .384.211l6.627-4.185a.25.25 0 0 0 0-.423z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
