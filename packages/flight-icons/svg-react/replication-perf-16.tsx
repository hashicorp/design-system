import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconReplicationPerf16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path
                        fillRule="evenodd"
                        d="M1 3.25A2.25 2.25 0 0 1 3.25 1h6.5A2.25 2.25 0 0 1 12 3.25v1.104a1 1 0 0 1 .078.067l.667.667A.7.7 0 0 1 12 6.237v1.45a1 1 0 0 1 .078.068l1.75 1.75a.7.7 0 0 1-.99.99L12 9.656v.094c0 .417-.113.807-.31 1.141.142.022.279.088.388.197l2.667 2.667a.7.7 0 1 1-.99.99l-2.667-2.667a.7.7 0 0 1-.197-.389c-.334.198-.724.311-1.141.311h-.093l.338.338a.7.7 0 0 1-.99.99l-1.25-1.25A1 1 0 0 1 7.687 12H6.323l1.755 1.755a.7.7 0 1 1-.99.99l-2.666-2.667A1 1 0 0 1 4.354 12H3.25A2.25 2.25 0 0 1 1 9.75zm2.25-.75a.75.75 0 0 0-.75.75v6.5c0 .414.336.75.75.75h6.5a.75.75 0 0 0 .75-.75v-6.5a.75.75 0 0 0-.75-.75z"
                        clipRule="evenodd"
                    />
                    <path d="M11.495 13.838a.7.7 0 0 0-.99.99l.583.584a.7.7 0 0 0 .99-.99zM15.345 11.021a.7.7 0 0 0-.99.99l.067.067a.7.7 0 0 0 .99-.99zM13.375 6.705a.7.7 0 0 1 .99 0l.833.833a.7.7 0 0 1-.99.99l-.833-.833a.7.7 0 0 1 0-.99" />
                </g>
            </svg>
        );
    }
);
