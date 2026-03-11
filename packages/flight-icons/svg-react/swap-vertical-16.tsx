import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSwapVertical16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M10.75 7c.412.003.75.337.75.75v5.59l1.95-2.1a.754.754 0 011.06-.04c.3.282.318.758.04 1.06l-3.25 3.5a.762.762 0 01-.55.24.758.758 0 01-.55-.24l-3.25-3.5a.75.75 0 011.1-1.02l1.95 2.1V7.75a.75.75 0 01.75-.75zm-5.5-7c.207.001.409.088.55.24l3.25 3.5a.757.757 0 01-.04 1.06.754.754 0 01-1.06-.04L6 2.66v5.59a.75.75 0 01-1.5 0V2.66l-1.95 2.1a.75.75 0 01-1.1-1.021L4.7.24A.758.758 0 015.25 0z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
