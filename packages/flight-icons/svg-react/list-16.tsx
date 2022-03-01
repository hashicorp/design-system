import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconList16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M2 3.75A.75.75 0 012.75 3h.5a.75.75 0 010 1.5h-.5A.75.75 0 012 3.75zm4 0A.75.75 0 016.75 3h6.5a.75.75 0 010 1.5h-6.5A.75.75 0 016 3.75zm-4 4A.75.75 0 012.75 7h.5a.75.75 0 010 1.5h-.5A.75.75 0 012 7.75zm4 0A.75.75 0 016.75 7h6.5a.75.75 0 010 1.5h-6.5A.75.75 0 016 7.75zm-4 4a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zm4 0a.75.75 0 01.75-.75h6.5a.75.75 0 010 1.5h-6.5a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
