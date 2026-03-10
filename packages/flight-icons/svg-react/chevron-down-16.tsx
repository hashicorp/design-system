import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconChevronDown16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M11.704 5.235a.752.752 0 011.06-.03c.3.284.314.759.03 1.06l-4.25 4.5A.756.756 0 018 11a.757.757 0 01-.546-.235l-4.25-4.5a.751.751 0 01.03-1.06.752.752 0 011.06.03L8 9.157l3.704-3.922z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
