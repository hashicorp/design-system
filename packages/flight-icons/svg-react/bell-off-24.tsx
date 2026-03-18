import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconBellOff24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.58 20.414a.75.75 0 0 1 1.34.672C14.37 22.188 13.297 23 12 23s-2.369-.812-2.92-1.914a.75.75 0 0 1 1.34-.672c.347.691.953 1.086 1.58 1.086s1.233-.395 1.58-1.086M1.22 1.22a.75.75 0 0 1 1.06 0l20.5 20.5a.75.75 0 1 1-1.06 1.06L16.94 18H1.75a.75.75 0 0 1 0-1.5C2.981 16.5 4 15.455 4 14.15V8.983c0-1.136.257-2.225.71-3.212L1.22 2.28a.75.75 0 0 1 0-1.061m4.64 5.7a6.1 6.1 0 0 0-.36 2.063v5.167c0 .873-.29 1.693-.782 2.35H15.44zM12 1c4.298 0 8 3.665 8 7.983v5.167q.001.26.053.503a.75.75 0 0 1-1.468.31 4 4 0 0 1-.085-.813V8.983C18.5 5.5 15.476 2.5 12 2.5c-1.4 0-2.734.487-3.83 1.31a.75.75 0 0 1-.9-1.2C8.603 1.608 10.249 1 12 1"
                />
            </svg>
        );
    }
);
