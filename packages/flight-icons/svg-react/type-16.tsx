import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconType16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
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
                    d="M2 2.75A.75.75 0 012.75 2h10a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V3.5H8.5v9H10a.75.75 0 010 1.5H5.5a.75.75 0 010-1.5H7v-9H3.5v.75a.75.75 0 01-1.5 0v-1.5z"
                />
            </svg>
        );
    }
);
