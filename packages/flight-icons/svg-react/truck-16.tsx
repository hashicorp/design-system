import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconTruck16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M9.25 1a2.25 2.25 0 012.25 2.25v.328h.643a2.25 2.25 0 011.565.634l1.607 1.558A2.25 2.25 0 0116 7.385v2.865A1.75 1.75 0 0114.292 12a2.5 2.5 0 11-4.584 0H6.292a2.5 2.5 0 11-4.584 0A1.75 1.75 0 010 10.25v-7A2.25 2.25 0 012.25 1h7zM4 12a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2zM2.25 2.5a.75.75 0 00-.75.75v7c0 .138.112.25.25.25H10V3.25a.75.75 0 00-.75-.75h-7zm9.25 8h2.75a.25.25 0 00.25-.25V7.385a.75.75 0 00-.229-.538l-1.607-1.558a.75.75 0 00-.521-.21H11.5V10.5z"
                />
            </svg>
        );
    }
);
