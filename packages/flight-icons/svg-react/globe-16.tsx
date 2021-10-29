import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconGlobe16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
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
                    d="M8 0a8 8 0 100 16A8 8 0 008 0zM6.128 1.774A6.508 6.508 0 001.576 7H4.07a11.095 11.095 0 012.06-5.226zm3.744 0A11.096 11.096 0 0111.932 7h2.492a6.508 6.508 0 00-4.552-5.226zM10.42 7C10.165 5.124 9.333 3.335 8 1.836 6.667 3.335 5.835 5.124 5.58 7h4.84zM5.527 8.5h4.946C10.31 10.557 9.451 12.533 8 14.164 6.55 12.533 5.691 10.557 5.527 8.5zm-1.505 0H1.52a6.505 6.505 0 004.61 5.726C4.896 12.525 4.163 10.555 4.021 8.5zm5.85 5.726c1.231-1.701 1.964-3.671 2.106-5.726h2.503a6.505 6.505 0 01-4.61 5.726z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
