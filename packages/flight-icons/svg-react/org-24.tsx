import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconOrg24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M15.25 2A2.75 2.75 0 0 1 18 4.75v5.504l2.325.988A2.75 2.75 0 0 1 22 13.773v6.477A1.75 1.75 0 0 1 20.25 22h-3a.747.747 0 0 1-.75-.75V4.75c0-.69-.56-1.25-1.25-1.25H4.75c-.69 0-1.25.56-1.25 1.25v16.5a.75.75 0 0 1-1.5 0V4.75A2.75 2.75 0 0 1 4.75 2zm-3.5 14c.69 0 1.25.56 1.25 1.25v4a.75.75 0 0 1-1.5 0V17.5h-3v3.75a.75.75 0 0 1-1.5 0v-4c0-.69.56-1.25 1.25-1.25zM18 20.5h2.25a.25.25 0 0 0 .25-.25v-6.477c0-.5-.3-.954-.76-1.15l-1.74-.74zM8.25 12a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5zm4 0a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5zm-4-3a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5zm4 0a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5zm-4-3a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5zm4 0a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5z"
                />
            </svg>
        );
    }
);
