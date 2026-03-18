import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconTv24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M14.621 1.342a.75.75 0 0 1 1.258.817L13.382 6h6.868A2.75 2.75 0 0 1 23 8.75v11.5A2.75 2.75 0 0 1 20.25 23H3.75A2.75 2.75 0 0 1 1 20.25V8.75A2.75 2.75 0 0 1 3.75 6h6.868L8.121 2.16a.751.751 0 0 1 1.258-.818L12 5.374zM3.75 7.5c-.69 0-1.25.56-1.25 1.25v11.5c0 .69.56 1.25 1.25 1.25h16.5c.69 0 1.25-.56 1.25-1.25V8.75c0-.69-.56-1.25-1.25-1.25z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
