import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSliders24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M6.5 13a.75.75 0 010 1.5h-2v6.25a.75.75 0 01-1.5 0V14.5H1A.75.75 0 011 13h5.5zm5.25-2a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0v-9a.75.75 0 01.75-.75zm10.75 4a.75.75 0 010 1.5h-2v4.25a.75.75 0 01-1.5 0V16.5h-2a.75.75 0 010-1.5h5.5zM19.75 2.5a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0v-9a.75.75 0 01.75-.75zm-16 0a.75.75 0 01.75.75v7a.75.75 0 01-1.5 0v-7a.75.75 0 01.75-.75zm8 0a.75.75 0 01.75.75V7.5h2a.75.75 0 010 1.5H9a.75.75 0 010-1.5h2V3.25a.75.75 0 01.75-.75z"
                />
            </svg>
        );
    }
);
