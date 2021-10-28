import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconChevronLeft24 = forwardRef<SVGSVGElement, IconProps>(
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
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M15.79 18.77a.75.75 0 00-.02-1.06L9.832 12l5.938-5.71a.75.75 0 10-1.04-1.08l-6.5 6.25a.75.75 0 000 1.08l6.5 6.25a.75.75 0 001.06-.02z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
