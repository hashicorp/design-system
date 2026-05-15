import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGitRepo24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.25 18a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.128.648L11 21.806l-1.872 1.092A.751.751 0 0 1 8 22.25v-3.5a.75.75 0 0 1 .75-.75zm6-17c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0 1 19.25 21H16a.75.75 0 0 1 0-1.5h3.25a.25.25 0 0 0 .25-.25V16H5.75c-.69 0-1.25.56-1.25 1.25v1c0 .69.56 1.25 1.25 1.25H6A.75.75 0 0 1 6 21h-.25A2.75 2.75 0 0 1 3 18.25V3.75A2.75 2.75 0 0 1 5.75 1zM5.75 2.5c-.69 0-1.25.56-1.25 1.25V14.8c.375-.192.8-.3 1.25-.3H19.5V2.75a.25.25 0 0 0-.25-.25z"
                />
            </svg>
        );
    }
);
