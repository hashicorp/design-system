import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMinimizeAlt16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M3.75 10A2.25 2.25 0 0 1 6 12.25v2.047a.75.75 0 0 1-1.5 0V12.25a.75.75 0 0 0-.75-.75H1.703a.75.75 0 0 1 0-1.5zm10.548 0a.75.75 0 0 1 0 1.5H12.25a.75.75 0 0 0-.75.75v2.047a.75.75 0 0 1-1.5 0V12.25A2.25 2.25 0 0 1 12.25 10zM5.25.953a.75.75 0 0 1 .75.75V3.75A2.25 2.25 0 0 1 3.75 6H1.703a.75.75 0 0 1 0-1.5H3.75a.75.75 0 0 0 .75-.75V1.703a.75.75 0 0 1 .75-.75m5.5 0a.75.75 0 0 1 .75.75V3.75c0 .414.336.75.75.75h2.048a.75.75 0 0 1 0 1.5H12.25A2.25 2.25 0 0 1 10 3.75V1.703a.75.75 0 0 1 .75-.75"
                />
            </svg>
        );
    }
);
