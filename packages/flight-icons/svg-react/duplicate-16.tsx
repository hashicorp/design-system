import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconDuplicate16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M2.25 0A2.25 2.25 0 000 2.25v7.5A2.25 2.25 0 002.25 12h.25a.75.75 0 000-1.5h-.25a.75.75 0 01-.75-.75v-7.5a.75.75 0 01.75-.75h7.5a.75.75 0 01.75.75v.25a.75.75 0 001.5 0v-.25A2.25 2.25 0 009.75 0h-7.5z" />
                    <path
                        fillRule="evenodd"
                        d="M6.25 4A2.25 2.25 0 004 6.25v7.5A2.25 2.25 0 006.25 16h7.5A2.25 2.25 0 0016 13.75v-7.5A2.25 2.25 0 0013.75 4h-7.5zM5.5 6.25a.75.75 0 01.75-.75h7.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75v-7.5z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
