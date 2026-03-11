import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconBriefcase24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M14.25 2A2.75 2.75 0 0117 4.75V6h3.25A2.75 2.75 0 0123 8.75v10.5A2.75 2.75 0 0120.25 22H3.75A2.75 2.75 0 011 19.25V8.75A2.75 2.75 0 013.75 6H7V4.75A2.75 2.75 0 019.75 2h4.5zM3.75 7.5c-.69 0-1.25.56-1.25 1.25v10.5c0 .69.56 1.25 1.25 1.25H6v-13H3.75zm3.75 13h9v-13h-9v13zm10.5 0h2.25c.69 0 1.25-.56 1.25-1.25V8.75c0-.69-.56-1.25-1.25-1.25H18v13zm-8.25-17c-.69 0-1.25.56-1.25 1.25V6h7V4.75c0-.69-.56-1.25-1.25-1.25h-4.5z"
                />
            </svg>
        );
    }
);
