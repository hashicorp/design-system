import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconScissors16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path
                        fillRule="evenodd"
                        d="M1 4a3 3 0 115.585 1.524L8 6.94l4.803-4.803a.75.75 0 011.06 1.06L8.539 8.523a.678.678 0 01-.016.016l-1.937 1.938a3 3 0 11-1.06-1.06L6.938 8 5.524 6.585A3 3 0 011 4zm3-1.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0 8a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                        clipRule="evenodd"
                    />
                    <path d="M9.116 9.123a.75.75 0 011.06 0l3.687 3.68a.75.75 0 11-1.06 1.061l-3.686-3.68a.75.75 0 01-.001-1.06z" />
                </g>
            </svg>
        );
    }
);
