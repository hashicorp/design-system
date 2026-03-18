import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconTest24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M2.5 12a9.5 9.5 0 0 1 9.977-9.488.75.75 0 1 0 .078-1.498A11 11 0 0 0 12 1C5.925 1 1 5.925 1 12s4.925 11 11 11a11 11 0 0 0 9.899-6.197V16.8q.123-.252.23-.506a.75.75 0 0 0-1.382-.583q-.092.218-.197.433A9.5 9.5 0 0 1 12 21.5 9.5 9.5 0 0 1 2.5 12M15.793 1.71a.75.75 0 1 0-.543 1.397q.444.174.866.39a.75.75 0 0 0 .686-1.333 11 11 0 0 0-1.009-.455M19.475 4.101a.75.75 0 1 0-1.05 1.071q.342.336.65.702a.75.75 0 0 0 1.148-.966q-.355-.42-.748-.807M21.967 7.696a.75.75 0 1 0-1.371.609q.194.438.347.893a.75.75 0 0 0 1.422-.476q-.175-.523-.398-1.026M22.942 11.97a.75.75 0 0 0-1.5.037q.013.476-.024.95a.75.75 0 0 0 1.495.119q.044-.555.03-1.107" />
                    <path d="M17.78 8.22a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l2.47 2.47 6.97-6.97a.75.75 0 0 1 1.06 0" />
                </g>
            </svg>
        );
    }
);
