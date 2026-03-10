import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconChevronDown24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M17.709 8.231a.752.752 0 011.06-.021.754.754 0 01.02 1.06l-6.25 6.5A.758.758 0 0112 16a.76.76 0 01-.54-.23l-6.25-6.5a.751.751 0 01.021-1.06.751.751 0 011.06.021L12 14.17l5.709-5.938z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
