import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconArrowDownLeft24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M18.78 6.28a.75.75 0 00-1.06-1.06L6.5 16.44V8.75a.75.75 0 00-1.5 0v9.5a.748.748 0 00.218.529l.002.001.001.002A.748.748 0 005.75 19h9.5a.75.75 0 000-1.5H7.56L18.78 6.28z"
                />
            </svg>
        );
    }
);
