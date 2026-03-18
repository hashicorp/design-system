import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGitlab24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="m21.964 13.292-1.12-3.363-2.218-6.673a.38.38 0 0 0-.363-.255.38.38 0 0 0-.364.255l-2.217 6.669H8.316L6.1 3.256A.38.38 0 0 0 5.736 3a.38.38 0 0 0-.363.256L3.16 9.925l-1.12 3.367a.74.74 0 0 0 .275.833L12 21l9.683-6.875a.74.74 0 0 0 .28-.833"
                />
            </svg>
        );
    }
);
