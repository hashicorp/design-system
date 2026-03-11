import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconOutline16 = forwardRef<SVGSVGElement, IconProps>(
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
                <path
                    fill={color}
                    d="M12.75 0A2.25 2.25 0 0115 2.25v11.5A2.25 2.25 0 0112.75 16h-9.5A2.25 2.25 0 011 13.75V2.25A2.25 2.25 0 013.25 0h9.5zm-9.5 1.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h9.5a.75.75 0 00.75-.75V2.25a.75.75 0 00-.75-.75h-9.5zm1.51 8a.75.75 0 010 1.5h-.01a.75.75 0 010-1.5h.01zm5.49 0a.75.75 0 010 1.5h-3a.75.75 0 010-1.5h3zm-5.49-3a.75.75 0 010 1.5h-.01a.75.75 0 010-1.5h.01zm6.49 0a.75.75 0 010 1.5h-4a.75.75 0 010-1.5h4zm-6.49-3a.75.75 0 010 1.5h-.01a.75.75 0 010-1.5h.01zm4.99 0a.75.75 0 010 1.5h-2.5a.75.75 0 010-1.5h2.5z"
                />
            </svg>
        );
    }
);
