import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPacker24 = forwardRef<SVGSVGElement, IconProps>(
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
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden={!title}
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <g fill={color}>
                    <path d="M8.028.5l8.067 4.668c1.593.928 2.903 2.996 2.905 4.6v7.134c0 1.614-1.306 2.158-2.903 1.233l-2.58-1.49V6.922L8.027 3.738V.5z" />
                    <path d="M12.42 7.62L5 3.31v15.88l7.42 4.309V7.62z" />
                </g>
            </svg>
        );
    }
);
