import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconBell24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.58 20.414a.75.75 0 0 1 1.34.672C14.37 22.188 13.297 23 12 23s-2.369-.812-2.92-1.914a.75.75 0 0 1 1.34-.672c.347.691.953 1.086 1.58 1.086s1.233-.395 1.58-1.086M12 1c4.298 0 8 3.665 8 7.983v5.167c0 1.305 1.019 2.35 2.25 2.35a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5C2.981 16.5 4 15.455 4 14.15V8.983C4 4.665 7.702 1 12 1m0 1.5c-3.476 0-6.5 3-6.5 6.483v5.167c0 .873-.29 1.693-.782 2.35h14.564a3.9 3.9 0 0 1-.782-2.35V8.983C18.5 5.5 15.476 2.5 12 2.5"
                />
            </svg>
        );
    }
);
