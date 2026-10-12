import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconDiamondFill16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M6.407.753a2.25 2.25 0 0 1 3.183 0l5.656 5.658a2.253 2.253 0 0 1 0 3.181L9.59 15.248a2.254 2.254 0 0 1-3.183 0L.751 9.593a2.25 2.25 0 0 1 0-3.181z"
                />
            </svg>
        );
    }
);
