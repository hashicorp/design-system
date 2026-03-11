import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconToken24 = forwardRef<SVGSVGElement, IconProps>(
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
                <path
                    fill={color}
                    d="M10 1a9 9 0 018.043 4.957A9 9 0 115.957 18.043 9 9 0 0110 1zm8.833 7.265A9 9 0 018.265 18.833 7.5 7.5 0 1018.833 8.265zM10 2.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM8.763 5.228a1.75 1.75 0 012.474 0l3.536 3.535a1.75 1.75 0 010 2.475l-3.536 3.535a1.75 1.75 0 01-2.474 0l-3.536-3.535a1.75 1.75 0 010-2.475l3.536-3.535zm1.414 1.06a.25.25 0 00-.354 0L6.287 9.823a.251.251 0 000 .355l3.536 3.535a.25.25 0 00.354 0l3.535-3.535a.251.251 0 000-.355l-3.535-3.535z"
                />
            </svg>
        );
    }
);
