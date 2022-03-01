import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconYoutube24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M20.608 4.77a2.757 2.757 0 011.939 1.938C23 8.43 23 12 23 12s0 3.57-.453 5.292a2.757 2.757 0 01-1.94 1.939c-1.72.453-8.607.453-8.607.453s-6.886 0-8.608-.453a2.756 2.756 0 01-1.939-1.94C1 15.589 1 12 1 12s0-3.57.453-5.292a2.756 2.756 0 011.94-1.939C5.112 4.316 12 4.316 12 4.316s6.886 0 8.608.453zm-5.092 7.248l-5.727 3.298V8.702l5.727 3.316z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
