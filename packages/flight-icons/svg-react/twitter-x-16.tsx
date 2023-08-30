import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconTwitterX16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M9.142 7.081L13.609 2H12.55L8.671 6.412 5.573 2H2l4.685 6.672L2 14h1.059l4.096-4.66L10.427 14H14L9.142 7.081zM3.44 2.78h1.626l7.485 10.476h-1.626L3.44 2.78z"
                />
            </svg>
        );
    }
);
