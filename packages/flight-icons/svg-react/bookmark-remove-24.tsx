import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconBookmarkRemove24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M8.75 10a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5z" />
                    <path
                        fillRule="evenodd"
                        d="M6.75 2A2.75 2.75 0 0 0 4 4.75v16.376a1 1 0 0 0 1.382.924l6.522-2.699a.25.25 0 0 1 .192 0l6.522 2.699A1 1 0 0 0 20 21.126V4.75A2.75 2.75 0 0 0 17.25 2zM5.5 4.75c0-.69.56-1.25 1.25-1.25h10.5c.69 0 1.25.56 1.25 1.25v15.628l-5.83-2.413a1.75 1.75 0 0 0-1.34 0L5.5 20.378z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
