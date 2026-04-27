import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSend16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.475.92c1-.366 1.972.606 1.604 1.606l-4.272 11.596a1.25 1.25 0 0 1-2.19.294L5.71 10.348a.3.3 0 0 0-.058-.059l-4.07-2.906a1.25 1.25 0 0 1 .296-2.19zM2.84 6.437l3.344 2.39 3.07-3.072a.7.7 0 0 1 .991 0 .7.7 0 0 1 0 .99l-3.071 3.07 2.388 3.346 3.922-10.645z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
