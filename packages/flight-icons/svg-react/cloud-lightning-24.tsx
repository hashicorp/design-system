import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCloudLightning24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M11.819 1.485a8.86 8.86 0 0 0-4.357-.363 8.9 8.9 0 0 0-4.004 1.765A9 9 0 0 0 .766 6.353a9.07 9.07 0 0 0 .649 8.509 8.96 8.96 0 0 0 3.187 3.01.75.75 0 0 0 .731-1.309 7.46 7.46 0 0 1-2.653-2.507 7.565 7.565 0 0 1-.54-7.1A7.5 7.5 0 0 1 4.381 4.07 7.4 7.4 0 0 1 7.711 2.6a7.36 7.36 0 0 1 3.618.302 7.4 7.4 0 0 1 3.046 1.999 7.5 7.5 0 0 1 1.744 3.22.75.75 0 0 0 .727.565c1.732 0 3.082.103 4.214 1.134a4.44 4.44 0 0 1 .589 5.888 4.36 4.36 0 0 1-2.644 1.702.75.75 0 0 0 .302 1.47 5.86 5.86 0 0 0 3.553-2.288 5.94 5.94 0 0 0-.79-7.88c-1.427-1.3-3.094-1.495-4.66-1.522a9 9 0 0 0-1.93-3.304 8.9 8.9 0 0 0-3.661-2.402" />
                    <path d="M14.031 11.03a.75.75 0 1 0-1.062-1.06l-4.75 4.77a.75.75 0 0 0 .31 1.246l5.372 1.653-3.956 4.357a.75.75 0 0 0 1.11 1.008l4.75-5.23a.75.75 0 0 0-.334-1.222l-5.312-1.634z" />
                </g>
            </svg>
        );
    }
);
