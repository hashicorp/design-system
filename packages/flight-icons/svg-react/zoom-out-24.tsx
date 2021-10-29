import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconZoomOut24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
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
                    <path d="M7.25 10a.75.75 0 000 1.5h7a.75.75 0 000-1.5h-7z" />
                    <path
                        fillRule="evenodd"
                        d="M2 10.75a8.75 8.75 0 1115.445 5.634l4.335 4.336a.75.75 0 11-1.06 1.06l-4.336-4.335A8.75 8.75 0 012 10.75zm8.75-7.25a7.25 7.25 0 100 14.5 7.25 7.25 0 000-14.5z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
