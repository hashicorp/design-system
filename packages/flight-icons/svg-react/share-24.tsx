import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconShare24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8.5 9a.75.75 0 0 1 0 1.5H5.75c-.69 0-1.25.56-1.25 1.25v8.5c0 .69.56 1.25 1.25 1.25h12.5c.69 0 1.25-.56 1.25-1.25v-8.5c0-.69-.56-1.25-1.25-1.25H15.5a.75.75 0 0 1 0-1.5h2.75A2.75 2.75 0 0 1 21 11.75v8.5A2.75 2.75 0 0 1 18.25 23H5.75A2.75 2.75 0 0 1 3 20.25v-8.5A2.75 2.75 0 0 1 5.75 9zM12 1a.75.75 0 0 1 .545.236l4.25 4.5a.75.75 0 1 1-1.09 1.029L12.75 3.637V14.25a.75.75 0 0 1-1.5 0V3.637L8.295 6.765a.75.75 0 1 1-1.09-1.03l4.25-4.5A.75.75 0 0 1 12 1"
                />
            </svg>
        );
    }
);
