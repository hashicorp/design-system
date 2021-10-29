import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconFileSource16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
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
                    <path d="M7.22 7.838a.625.625 0 01-.058.882L5.699 10l1.463 1.28a.625.625 0 01-.824.94l-2-1.75a.625.625 0 010-.94l2-1.75a.625.625 0 01.882.058zM8.838 8.72a.625.625 0 01.824-.94l2 1.75a.625.625 0 010 .94l-2 1.75a.625.625 0 01-.824-.94L10.301 10 8.838 8.72z" />
                    <path
                        fillRule="evenodd"
                        d="M3.25 0A2.25 2.25 0 001 2.25v11.5A2.25 2.25 0 003.25 16h9.5A2.25 2.25 0 0015 13.75V5.457c0-.331-.132-.65-.366-.884L10.427.366A1.25 1.25 0 009.543 0H3.25zM2.5 2.25a.75.75 0 01.75-.75H9v3.75c0 .414.336.75.75.75h3.75v7.75a.75.75 0 01-.75.75h-9.5a.75.75 0 01-.75-.75V2.25zm9.94 2.25L10.5 2.56V4.5h1.94z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
