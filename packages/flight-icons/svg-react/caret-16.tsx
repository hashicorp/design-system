import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCaret16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M10.7 9.24a.754.754 0 011.06-.04c.3.282.318.758.04 1.06l-3.25 3.5A.762.762 0 018 14a.758.758 0 01-.55-.24l-3.25-3.5a.75.75 0 011.1-1.02L8 12.147l2.7-2.909zM8 2a.762.762 0 01.55.24l3.25 3.5a.757.757 0 01-.04 1.06.754.754 0 01-1.06-.04L8 3.854 5.3 6.76A.75.75 0 014.2 5.74l3.25-3.5A.758.758 0 018 2z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
