import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconTag16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M7.495 1c.597 0 1.17.237 1.592.66l5.383 5.382a2.25 2.25 0 010 3.182l-4.246 4.246a2.25 2.25 0 01-3.182 0L1.659 9.087A2.252 2.252 0 011 7.495V2.25C1 1.56 1.56 1 2.25 1h5.245zM2.5 7.495c0 .199.08.39.22.531l5.383 5.383a.75.75 0 001.06 0l4.246-4.246a.75.75 0 000-1.06L8.026 2.72a.752.752 0 00-.53-.22H2.5v4.995zM5.006 4a1 1 0 010 2H5a1 1 0 010-2h.006z"
                />
            </svg>
        );
    }
);
