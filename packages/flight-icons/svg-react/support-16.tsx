import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSupport16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8c0-1.525.525-2.927 1.404-4.035l1.787 1.787A3.982 3.982 0 004 8c0 .834.255 1.608.691 2.248l-1.787 1.787A6.472 6.472 0 011.5 8zm2.465 5.096l1.787-1.787C6.392 11.745 7.166 12 8 12c.834 0 1.608-.255 2.248-.691l1.787 1.787A6.472 6.472 0 018 14.5a6.473 6.473 0 01-4.035-1.404zm9.131-1.06A6.472 6.472 0 0014.5 8a6.473 6.473 0 00-1.404-4.035l-1.787 1.787C11.745 6.392 12 7.166 12 8c0 .834-.255 1.608-.691 2.248l1.787 1.787zm-1.06-9.132A6.472 6.472 0 008 1.5a6.472 6.472 0 00-4.035 1.404l1.787 1.787A3.982 3.982 0 018 4c.834 0 1.608.255 2.248.691l1.787-1.787zM5.5 8a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
