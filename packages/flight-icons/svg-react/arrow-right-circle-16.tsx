import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconArrowRightCircle16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 0a8 8 0 110 16A8 8 0 018 0zm0 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zm.245 3.195a.75.75 0 011.06.05l2.5 2.75c.26.286.26.724 0 1.01l-2.5 2.75a.75.75 0 01-1.11-1.01l1.36-1.495H4.75a.75.75 0 010-1.5h4.805l-1.36-1.495a.75.75 0 01.05-1.06z"
                />
            </svg>
        );
    }
);
