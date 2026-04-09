import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconBox16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M6.98.678a2.25 2.25 0 0 1 2.04 0l5.297 2.696c.418.213.682.644.683 1.113v6.717c0 .658-.37 1.261-.956 1.56L9.02 15.32c-.642.326-1.4.326-2.042 0l-5.023-2.557A1.75 1.75 0 0 1 1 11.204V4.487c0-.469.265-.9.683-1.113zM2.5 11.204c0 .093.054.18.137.223l4.613 2.348V7.963L2.5 5.588zm6.25-3.241v5.812l4.613-2.348a.25.25 0 0 0 .137-.223V5.588zm-.41-5.95a.75.75 0 0 0-.68 0l-4.436 2.26L8 6.66l4.776-2.388z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
