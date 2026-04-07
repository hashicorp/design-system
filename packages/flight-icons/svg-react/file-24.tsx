import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconFile24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.336 1c.464 0 .91.185 1.237.513l5.914 5.914c.328.328.513.774.513 1.238V20.25A2.75 2.75 0 0 1 18.25 23H5.75A2.75 2.75 0 0 1 3 20.25V3.75A2.75 2.75 0 0 1 5.75 1zM5.75 2.5c-.69 0-1.25.56-1.25 1.25v16.5c0 .69.56 1.25 1.25 1.25h12.5c.69 0 1.25-.56 1.25-1.25V9h-5.75a.75.75 0 0 1-.75-.75V2.5zm8.75 5h3.94L14.5 3.561z"
                />
            </svg>
        );
    }
);
