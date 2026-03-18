import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCrosshair16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0m.75 3.25a.75.75 0 0 1-1.5 0V1.543A6.5 6.5 0 0 0 1.543 7.25H3.25a.75.75 0 0 1 0 1.5H1.543a6.5 6.5 0 0 0 5.707 5.707V12.75a.75.75 0 0 1 1.5 0v1.707a6.5 6.5 0 0 0 5.707-5.707H12.75a.75.75 0 0 1 0-1.5h1.707A6.5 6.5 0 0 0 8.75 1.543z"
                />
            </svg>
        );
    }
);
