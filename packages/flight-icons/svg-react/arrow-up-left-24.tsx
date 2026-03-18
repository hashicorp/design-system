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
                    d="M15.25 5a.75.75 0 0 1 0 1.5H7.56l11.22 11.22a.75.75 0 1 1-1.06 1.06L6.5 7.56v7.69a.75.75 0 0 1-1.5 0v-9.5c0-.206.083-.393.218-.528l.004-.004A.75.75 0 0 1 5.75 5z"
                />
            </svg>
        );
    }
);
