import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCloudabilityColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                <path fill="#6DC8EC" d="M15 8A7 7 0 111 8a7 7 0 0114 0z" />
                <path
                    fill="#fff"
                    d="M11.5 10.8H4.675s-1.4-.175-1.4-1.575 1.4-1.575 1.4-1.575.175-.875.875-1.4c.7-.525 1.75-.35 1.75-.35s.7-.875 1.75-.875 1.75.875 1.75.875L9.4 7.125l-.875-.875L4.85 9.575l3.675-2.1.875.875 2.1-1.75v1.225s1.05.175 1.05 1.4c0 1.225-1.05 1.575-1.05 1.575z"
                />
            </svg>
        );
    }
);
