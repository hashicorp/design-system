import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconServerCluster24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 .5a2.5 2.5 0 0 1 .75 4.886v1.67a5 5 0 0 1 3.256 1.951l1.73-.944a2.5 2.5 0 1 1 1.062 1.13l-2.084 1.136c.185.523.286 1.086.286 1.671 0 .616-.111 1.207-.315 1.752l1.766 1.285a2.5 2.5 0 1 1-.845 1.24l-1.659-1.206a5 5 0 0 1-3.197 1.874v1.67A2.501 2.501 0 0 1 12 23.5a2.5 2.5 0 0 1-.75-4.885v-1.67a5 5 0 0 1-3.196-1.874l-1.66 1.207A2.503 2.503 0 0 1 4 19.5a2.5 2.5 0 1 1 1.549-4.463l1.766-1.285A5 5 0 0 1 7 12c0-.585.1-1.148.286-1.67L5.203 9.192a2.5 2.5 0 1 1 1.06-1.13l1.732.944a5 5 0 0 1 3.255-1.951v-1.67A2.502 2.502 0 0 1 12 .5M12 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-8-4a1 1 0 1 0 0 2 1 1 0 0 0 0-2m16 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-8-7.5a3.5 3.5 0 0 0-3.089 5.147 3.5 3.5 0 0 0 6.179 0c.262-.49.41-1.05.41-1.647A3.5 3.5 0 0 0 12 8.5M4 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2m16 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-8-4a1 1 0 1 0 0 2 1 1 0 0 0 0-2"
                />
            </svg>
        );
    }
);
