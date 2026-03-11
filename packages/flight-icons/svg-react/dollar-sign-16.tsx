import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconDollarSign16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M7.75 0a.75.75 0 01.75.75V2h3.25a.75.75 0 010 1.5H8.5v3.75h1.094c.9 0 1.766.353 2.405.985A3.36 3.36 0 0113 10.625a3.36 3.36 0 01-1.001 2.39A3.422 3.422 0 019.594 14H8.5v1.25a.75.75 0 01-1.5 0V14H4.25a.75.75 0 010-1.5H7V8.75h-.594c-.9 0-1.766-.353-2.405-.985A3.36 3.36 0 013 5.375a3.36 3.36 0 011.001-2.39A3.422 3.422 0 016.406 2H7V.75A.75.75 0 017.75 0zm.75 12.5h1.094c.508 0 .994-.2 1.35-.553.357-.352.556-.828.556-1.322 0-.494-.2-.97-.556-1.322a1.922 1.922 0 00-1.35-.553H8.5v3.75zm-2.094-9c-.508 0-.994.2-1.35.553A1.859 1.859 0 004.5 5.375c0 .494.2.97.556 1.322.356.353.842.553 1.35.553H7V3.5h-.594z"
                />
            </svg>
        );
    }
);
