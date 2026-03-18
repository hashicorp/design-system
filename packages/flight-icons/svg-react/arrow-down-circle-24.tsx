import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconArrowDownCircle24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M12 6a.75.75 0 0 1 .75.75v8.614l2.955-3.129a.75.75 0 0 1 1.09 1.03l-4.25 4.5a1 1 0 0 1-.068.064.75.75 0 0 1-.465.17L12 18h-.012a.75.75 0 0 1-.535-.237l-4.248-4.498a.75.75 0 0 1 1.09-1.03l2.955 3.129V6.75A.75.75 0 0 1 12 6" />
                    <path
                        fillRule="evenodd"
                        d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12m11-9.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
