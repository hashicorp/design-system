import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMoveHorizontal16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M8 1a.75.75 0 01.75.75v12.5a.75.75 0 01-1.5 0V1.75A.75.75 0 018 1zM3.526 5.168A.75.75 0 014.53 6.28l-.97.97H5.5a.75.75 0 010 1.5H3.56l.97.97a.75.75 0 01-1.06 1.06L1.22 8.53a.75.75 0 010-1.06l2.25-2.25.056-.052zM11.47 5.22a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06-1.06l.97-.97H10.5a.75.75 0 010-1.5h1.94l-.97-.97a.75.75 0 010-1.06z" />
                </g>
            </svg>
        );
    }
);
