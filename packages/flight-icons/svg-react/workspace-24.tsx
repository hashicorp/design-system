import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconWorkspace24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M11 11a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2v-7a2 2 0 012-2h7zm-7 1.5a.5.5 0 00-.5.5v7a.5.5 0 00.5.5h7a.5.5 0 00.5-.5v-7a.5.5 0 00-.5-.5H4zM20 11a2 2 0 012 2v4a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4a2 2 0 012-2h4zm-4 1.5a.5.5 0 00-.5.5v4a.5.5 0 00.5.5h4a.5.5 0 00.5-.5v-4a.5.5 0 00-.5-.5h-4zM8 2a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2h4zm12 0a2 2 0 012 2v4a2 2 0 01-2 2h-7a2 2 0 01-2-2V4a2 2 0 012-2h7zM4 3.5a.5.5 0 00-.5.5v4a.5.5 0 00.5.5h4a.5.5 0 00.5-.5V4a.5.5 0 00-.5-.5H4zm9 0a.5.5 0 00-.5.5v4a.5.5 0 00.5.5h7a.5.5 0 00.5-.5V4a.5.5 0 00-.5-.5h-7z"
                />
            </svg>
        );
    }
);
