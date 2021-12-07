import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconNomad16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 0L1 4v8l7 4 7-4V4L8 0zm3.119 8.797L9.254 9.863 7.001 8.65v2.549l-2.118 1.33v-5.33l1.68-1.018 2.332 1.216V4.794l2.23-1.322-.006 5.325z"
                />
            </svg>
        );
    }
);
