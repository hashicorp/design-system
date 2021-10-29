import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconDelete16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M11.78 5.22a.75.75 0 010 1.06L10.06 8l1.72 1.72a.75.75 0 11-1.06 1.06L9 9.06l-1.72 1.72a.75.75 0 11-1.06-1.06L7.94 8 6.22 6.28a.75.75 0 011.06-1.06L9 6.94l1.72-1.72a.75.75 0 011.06 0z" />
                    <path
                        fillRule="evenodd"
                        d="M4.393 2.61A1.75 1.75 0 015.72 2h8.03A2.25 2.25 0 0116 4.25v7.5A2.25 2.25 0 0113.75 14H5.72a1.75 1.75 0 01-1.327-.61L.181 8.49a.75.75 0 010-.978L4.393 2.61zm1.327.89a.25.25 0 00-.19.087L1.74 8l3.792 4.413a.25.25 0 00.19.087h8.029a.75.75 0 00.75-.75v-7.5a.75.75 0 00-.75-.75H5.72z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
