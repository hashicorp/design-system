import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconActivity16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M6.016 1a.75.75 0 01.698.521l3.306 10.33 1.47-4.341A.75.75 0 0112.2 7H15a.75.75 0 010 1.5h-2.262l-2.028 5.99a.75.75 0 01-1.424-.011L5.952 4.06 4.504 8.008A.75.75 0 013.8 8.5H1A.75.75 0 111 7h2.276l2.02-5.508c.11-.301.4-.499.72-.492z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
