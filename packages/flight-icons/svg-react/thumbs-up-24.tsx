import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconThumbsUp24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M10.976 1A3.525 3.525 0 0 1 14.5 4.524V7.75c0 .138.112.25.25.25h5.174a2.75 2.75 0 0 1 2.719 3.163l-1.444 9.5A2.75 2.75 0 0 1 18.48 23H3.75A2.75 2.75 0 0 1 1 20.25v-7.5A2.75 2.75 0 0 1 3.75 10h2.513l3.71-8.349c.176-.396.57-.651 1.003-.651M3.75 11.5c-.69 0-1.25.56-1.25 1.25v7.5c0 .69.56 1.25 1.25 1.25H6v-10zm3.75-.59V21.5h10.98a1.25 1.25 0 0 0 1.237-1.062l1.442-9.5A1.25 1.25 0 0 0 19.924 9.5H14.75A1.75 1.75 0 0 1 13 7.75V4.524a2.025 2.025 0 0 0-1.77-2.008z"
                />
            </svg>
        );
    }
);
