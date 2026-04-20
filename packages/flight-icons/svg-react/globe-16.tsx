import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGlobe16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M1.519 8.5a6.51 6.51 0 0 0 4.609 5.727C4.897 12.525 4.164 10.555 4.022 8.5zm10.458 0c-.14 2.055-.874 4.025-2.105 5.727a6.505 6.505 0 0 0 4.61-5.727zm-6.45 0C5.69 10.557 6.548 12.532 8 14.164c1.45-1.632 2.309-3.607 2.474-5.664zm.6-6.727A6.51 6.51 0 0 0 1.578 7h2.491a11.1 11.1 0 0 1 2.06-5.227M8 1.836C6.667 3.335 5.834 5.124 5.58 7h4.84C10.166 5.124 9.333 3.335 8 1.836m1.872-.063A11.1 11.1 0 0 1 11.932 7h2.492a6.51 6.51 0 0 0-4.552-5.227"
                />
            </svg>
        );
    }
);
