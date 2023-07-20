import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconNewRelic16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 3.693l3.692 2.153v4.308L8 12.308V15l6-3.5v-7L8 1 2 4.5v2.693l3.691 2.154v4.307L8.001 15V8L4.307 5.846 8 3.693z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
