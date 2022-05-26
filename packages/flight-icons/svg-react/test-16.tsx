import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconTest16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M1.5 8a6.5 6.5 0 016.744-6.496.75.75 0 10.055-1.499 8 8 0 107.036 11.193.75.75 0 00-1.375-.6 6.722 6.722 0 01-.22.453A6.5 6.5 0 011.5 8zM11.74.926a.75.75 0 10-.703 1.326c.144.076.284.157.421.243a.75.75 0 00.8-1.27 7.995 7.995 0 00-.519-.299zM14.774 3.743a.75.75 0 00-1.27.799c.087.137.168.277.244.42a.75.75 0 001.326-.701 8.04 8.04 0 00-.3-.518zM15.995 7.7a.75.75 0 00-1.5.056 6.583 6.583 0 01.002.45.75.75 0 101.5.047 8.158 8.158 0 00-.002-.552z" />
                    <path d="M11.78 5.22a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-2-2a.75.75 0 011.06-1.06l1.47 1.47 3.97-3.97a.75.75 0 011.06 0z" />
                </g>
            </svg>
        );
    }
);
