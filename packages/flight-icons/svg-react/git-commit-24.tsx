import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGitCommit24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 7.75c1.953 0 3.579 1.4 3.93 3.25h4.32a.75.75 0 0 1 0 1.5h-4.32a4.001 4.001 0 0 1-7.86 0H3.75a.75.75 0 0 1 0-1.5h4.32A4 4 0 0 1 12 7.75m0 1.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5"
                />
            </svg>
        );
    }
);
