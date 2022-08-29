import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconStep24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M18.75 20.75a.75.75 0 000-1.5h-5.071c-.839 0-1.646-.34-2.243-.947A3.287 3.287 0 0110.5 16v-.25h.25A2.25 2.25 0 0013 13.5v-2a2.25 2.25 0 00-2.25-2.25h-.25V4A.75.75 0 009 4v5.25h-.25A2.25 2.25 0 006.5 11.5v2a2.25 2.25 0 002.25 2.25H9V16c0 1.256.49 2.462 1.366 3.354a4.643 4.643 0 003.313 1.396h5.071zm-8-6.5a.75.75 0 00.75-.75v-2a.75.75 0 00-.75-.75h-2a.75.75 0 00-.75.75v2c0 .414.336.75.75.75h2z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
