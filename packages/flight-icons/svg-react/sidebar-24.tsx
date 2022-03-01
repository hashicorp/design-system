import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSidebar24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M4.75 2A2.75 2.75 0 002 4.75v14.5A2.75 2.75 0 004.75 22h14.5A2.75 2.75 0 0022 19.25V4.75A2.75 2.75 0 0019.25 2H4.75zM3.5 4.75c0-.69.56-1.25 1.25-1.25H8v17H4.75c-.69 0-1.25-.56-1.25-1.25V4.75zm6 15.75h9.75c.69 0 1.25-.56 1.25-1.25V4.75c0-.69-.56-1.25-1.25-1.25H9.5v17z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
