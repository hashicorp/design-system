import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPower16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M11.988 2.765a.75.75 0 011.06.036 7.25 7.25 0 11-10.596 0 .75.75 0 111.096 1.024 5.75 5.75 0 108.404 0 .75.75 0 01.036-1.06zM7.75.5a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0v-5.5A.75.75 0 017.75.5z"
                />
            </svg>
        );
    }
);
