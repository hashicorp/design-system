import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconReload16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M7.192.248a.75.75 0 0 1 1.06-.056l2.5 2.25a.75.75 0 0 1 0 1.116l-2.5 2.25a.75.75 0 0 1-1.004-1.116l1.29-1.16a4.5 4.5 0 1 0 3.655 2.832.75.75 0 0 1 1.398-.546A6 6 0 1 1 8 2h.016l-.77-.692a.75.75 0 0 1-.055-1.06"
                />
            </svg>
        );
    }
);
