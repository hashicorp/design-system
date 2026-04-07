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
                    d="M4.62 1.82a1.6 1.6 0 0 1 2.26 0L8.5 3.44l1.72-1.72a.75.75 0 0 1 1.06 0c.29.293.29.769 0 1.06L9.56 4.5l1.94 1.94 1.72-1.72a.75.75 0 0 1 1.06 0c.29.293.29.769 0 1.06L12.56 7.5l1.606 1.606c.62.624.621 1.636 0 2.26a6.407 6.407 0 0 1-8.753.283l-2.108 2.107a.75.75 0 0 1-1.06-1.06l2.106-2.108A6.403 6.403 0 0 1 4.62 1.82m1.2 1.06a.1.1 0 0 0-.14 0 4.903 4.903 0 0 0 0 6.933l.493.492a4.906 4.906 0 0 0 6.932 0 .104.104 0 0 0 0-.139z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
