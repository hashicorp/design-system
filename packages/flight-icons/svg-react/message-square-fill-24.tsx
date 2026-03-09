import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMessageSquareFill24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M13.75 12a.75.75 0 010 1.5h-7a.75.75 0 010-1.5h7zM11.75 9a.75.75 0 010 1.5h-5a.75.75 0 010-1.5h5zM16.75 6a.75.75 0 010 1.5h-10a.75.75 0 010-1.5h10z" />
                    <path
                        fillRule="evenodd"
                        d="M19.25 2A2.75 2.75 0 0122 4.75v10.5A2.75 2.75 0 0119.25 18H8.26a1.25 1.25 0 00-.801.291l-4.228 3.534A.75.75 0 012 21.25V4.75A2.75 2.75 0 014.75 2h14.5zM4.75 3.5c-.69 0-1.25.56-1.25 1.25v14.895l2.996-2.504a2.752 2.752 0 011.765-.641H19.25c.69 0 1.25-.56 1.25-1.25V4.75c0-.69-.56-1.25-1.25-1.25H4.75z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
