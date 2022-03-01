import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconArrowUpLeft24 = forwardRef<SVGSVGElement, IconProps>(
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
                <path
                    fill={color}
                    d="M6.5 15.25a.75.75 0 01-1.5 0v-9.5c0-.206.083-.393.218-.529l.002-.001.001-.002A.748.748 0 015.75 5h9.5a.75.75 0 010 1.5H7.56l11.22 11.22a.75.75 0 11-1.06 1.06L6.5 7.56v7.69z"
                />
            </svg>
        );
    }
);
