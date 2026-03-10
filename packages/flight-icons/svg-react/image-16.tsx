import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconImage16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.75 0A2.25 2.25 0 0116 2.25v11.5A2.25 2.25 0 0113.75 16H2.25A2.25 2.25 0 010 13.75V2.25A2.25 2.25 0 012.25 0h11.5zm-2.146 7.415a.25.25 0 00-.333-.018L2.446 14.5H13.75a.75.75 0 00.75-.75v-3.44l-2.896-2.895zM2.25 1.5a.75.75 0 00-.75.75v11.086l8.83-7.107a1.75 1.75 0 012.335.125L14.5 8.19V2.25a.75.75 0 00-.75-.75H2.25zM5.5 3a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm0 1.5a1 1 0 100 2 1 1 0 000-2z"
                />
            </svg>
        );
    }
);
