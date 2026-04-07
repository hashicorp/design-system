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
                    d="M11.988 2.765a.75.75 0 0 1 1.06.036 7.25 7.25 0 1 1-10.596 0 .75.75 0 1 1 1.096 1.024 5.75 5.75 0 1 0 8.404 0 .75.75 0 0 1 .036-1.06M7.75.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0v-5.5A.75.75 0 0 1 7.75.5"
                />
            </svg>
        );
    }
);
