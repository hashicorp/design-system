import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconDocs24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M19.25 1c.966 0 1.75.784 1.75 1.75v18.5A1.75 1.75 0 0 1 19.25 23H5.75A2.75 2.75 0 0 1 3 20.25V3.75A2.75 2.75 0 0 1 5.75 1zM5.75 19a1.25 1.25 0 1 0 0 2.5h13.5a.25.25 0 0 0 .25-.25V19zm0-16.5c-.69 0-1.25.56-1.25 1.25V17.8c.375-.192.8-.3 1.25-.3H19.5V2.75a.25.25 0 0 0-.25-.25z"
                />
            </svg>
        );
    }
);
