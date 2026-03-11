import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconArrowRight16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8.205 2.985a.75.75 0 011.06-.03l4.5 4.25c.15.141.235.34.235.545a.753.753 0 01-.235.545l-4.5 4.25a.75.75 0 01-1.03-1.09L11.363 8.5H2.75a.75.75 0 010-1.5h8.613L8.235 4.045a.75.75 0 01-.03-1.06z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
