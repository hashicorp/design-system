import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconVagrant16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.08.75L9.924 2.58v1.123L8 8.245 6.076 3.703V2.58L2.92.75 1 1.864v1.293l4.276 10.514L8 15.25l2.724-1.579L15 3.157V1.864L13.08.75z"
                />
            </svg>
        );
    }
);
