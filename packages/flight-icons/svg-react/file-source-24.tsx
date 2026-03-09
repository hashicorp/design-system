import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconFileSource24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.336 1c.464 0 .91.185 1.237.513l5.914 5.914c.329.328.513.773.513 1.237V20.25A2.75 2.75 0 0118.25 23H5.75A2.75 2.75 0 013 20.25V3.75A2.75 2.75 0 015.75 1h7.586zM5.75 2.5c-.69 0-1.25.56-1.25 1.25v16.5c0 .69.56 1.25 1.25 1.25h12.5c.69 0 1.25-.56 1.25-1.25V9h-5.75a.75.75 0 01-.75-.75V2.5H5.75zm4.05 9.65a.75.75 0 01.9 1.2L8.5 15l2.2 1.65a.75.75 0 01-.9 1.2l-3-2.25a.75.75 0 010-1.2l3-2.25zm3.35.15a.75.75 0 011.05-.15l3 2.25a.75.75 0 010 1.2l-3 2.25a.75.75 0 01-.9-1.2L15.5 15l-2.2-1.65a.75.75 0 01-.15-1.05zm1.35-4.8h3.94L14.5 3.56V7.5z"
                />
            </svg>
        );
    }
);
