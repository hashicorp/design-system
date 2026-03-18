import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconTv16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M9.376.334a.75.75 0 0 1 1.248.832L9.401 3h4.349A2.25 2.25 0 0 1 16 5.25v7.5A2.25 2.25 0 0 1 13.75 15H2.25A2.25 2.25 0 0 1 0 12.75v-7.5A2.25 2.25 0 0 1 2.25 3h4.349L5.376 1.166A.75.75 0 0 1 6.624.334L8 2.398zM2.25 4.5a.75.75 0 0 0-.75.75v7.5c0 .414.336.75.75.75h11.5a.75.75 0 0 0 .75-.75v-7.5a.75.75 0 0 0-.75-.75z"
                />
            </svg>
        );
    }
);
