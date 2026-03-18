import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSmile16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0m0 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13m1.759 7.861a.75.75 0 0 1 1.284.775l-.212.304c-.128.168-.317.39-.564.615C9.782 11.495 9.009 12 8 12c-1.01 0-1.782-.505-2.267-.945a4.7 4.7 0 0 1-.564-.615 3 3 0 0 1-.212-.304.75.75 0 0 1 1.284-.775q.055.086.118.167c.088.114.218.267.383.417.34.31.768.555 1.258.555s.918-.246 1.258-.555a3.2 3.2 0 0 0 .5-.584M6.007 5a1 1 0 0 1 0 2H6a1 1 0 0 1 0-2zm4 0a1 1 0 0 1 0 2H10a1 1 0 1 1 0-2z"
                />
            </svg>
        );
    }
);
