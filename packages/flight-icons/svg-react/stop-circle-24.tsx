import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconStopCircle24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color} fillRule="evenodd" clipRule="evenodd">
                    <path d="M8.75 7A1.75 1.75 0 007 8.75v6.5c0 .966.784 1.75 1.75 1.75h6.5A1.75 1.75 0 0017 15.25v-6.5A1.75 1.75 0 0015.25 7h-6.5zM8.5 8.75a.25.25 0 01.25-.25h6.5a.25.25 0 01.25.25v6.5a.25.25 0 01-.25.25h-6.5a.25.25 0 01-.25-.25v-6.5z" />
                    <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z" />
                </g>
            </svg>
        );
    }
);
