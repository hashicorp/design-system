import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconFilterCircle24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M8.25 12a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5h-7.5zM5 8.75A.75.75 0 015.75 8h12.5a.75.75 0 010 1.5H5.75A.75.75 0 015 8.75zM10.75 16a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5z" />
                    <path
                        fillRule="evenodd"
                        d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
