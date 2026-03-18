import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAward16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 0a6 6 0 0 1 4.214 10.27 1 1 0 0 1 .027.113l.75 4.75a.75.75 0 0 1-.991.824l-4-1.412-4 1.412a.75.75 0 0 1-.991-.824l.75-4.75a1 1 0 0 1 .027-.112A6 6 0 0 1 8 0m2.863 11.274A6 6 0 0 1 8 12a6 6 0 0 1-2.863-.726l-.45 2.85 3.063-1.081a.75.75 0 0 1 .5 0l3.063 1.081zM8 1.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9"
                />
            </svg>
        );
    }
);
