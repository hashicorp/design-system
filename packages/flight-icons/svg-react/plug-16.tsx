import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPlug16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M6.88 1.82a1.598 1.598 0 00-2.26 0 6.403 6.403 0 00-.268 8.768l-2.107 2.107a.75.75 0 101.06 1.06l2.108-2.107a6.403 6.403 0 008.753-.283 1.598 1.598 0 000-2.26L12.561 7.5l1.72-1.72a.75.75 0 10-1.061-1.06L11.5 6.44 9.56 4.5l1.72-1.72a.75.75 0 10-1.06-1.06L8.5 3.44 6.88 1.82zM5.681 2.88a.098.098 0 01.138 0l7.287 7.286c.038.038.038.1 0 .139a4.902 4.902 0 01-6.933 0l-.492-.492a4.902 4.902 0 010-6.933z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
