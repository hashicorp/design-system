import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconFolderFill24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M3.75 2A2.75 2.75 0 001 4.75v1c0 .414.336.75.75.75h18.5a.75.75 0 010 1.5H1.75a.75.75 0 00-.75.75v10.5A2.75 2.75 0 003.75 22h16.5A2.75 2.75 0 0023 19.25V6.75A2.75 2.75 0 0020.25 4h-7.172a1.25 1.25 0 01-.883-.366l-.829-.829A2.75 2.75 0 009.422 2H3.75z"
                />
            </svg>
        );
    }
);
