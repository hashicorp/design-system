import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconNode16 = forwardRef<SVGSVGElement, IconProps>(
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
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M4 6.25A2.25 2.25 0 016.25 4h3a2.25 2.25 0 012.25 2.25V7h3.25a.75.75 0 010 1.5H11.5v.75a2.25 2.25 0 01-2.25 2.25h-3A2.25 2.25 0 014 9.25V8.5H.75a.75.75 0 010-1.5H4v-.75zm6 0a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-3z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
