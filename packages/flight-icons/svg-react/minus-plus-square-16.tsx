import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconMinusPlusSquare16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M10.75 8a.75.75 0 01.75.75V10h1.25a.75.75 0 010 1.5H11.5v1.25a.75.75 0 01-1.5 0V11.5H8.75a.75.75 0 010-1.5H10V8.75a.75.75 0 01.75-.75z" />
                    <path
                        fillRule="evenodd"
                        d="M0 2.25A2.25 2.25 0 012.25 0h6a2.25 2.25 0 012.25 2.25V5.5h3.25A2.25 2.25 0 0116 7.75v6A2.25 2.25 0 0113.75 16h-6a2.25 2.25 0 01-2.25-2.25V10.5H2.25A2.25 2.25 0 010 8.25v-6zm9 0V5.5H7.707A.749.749 0 007 4.5H3.5a.75.75 0 000 1.5h2.836A2.246 2.246 0 005.5 7.75V9H2.25a.75.75 0 01-.75-.75v-6a.75.75 0 01.75-.75h6a.75.75 0 01.75.75zm-2 11.5v-6A.75.75 0 017.75 7h6a.75.75 0 01.75.75v6a.75.75 0 01-.75.75h-6a.75.75 0 01-.75-.75z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
