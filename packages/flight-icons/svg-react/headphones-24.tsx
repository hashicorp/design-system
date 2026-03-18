import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconHeadphones24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 2c2.646 0 5.187 1.023 7.064 2.849A9.63 9.63 0 0 1 22 11.75v7.5A2.75 2.75 0 0 1 19.25 22h-1.5A2.75 2.75 0 0 1 15 19.25v-3.5A2.75 2.75 0 0 1 17.75 13h2.75v-1.25c0-2.181-.89-4.277-2.482-5.826A8.63 8.63 0 0 0 12 3.5c-2.26 0-4.425.874-6.018 2.424A8.13 8.13 0 0 0 3.5 11.75V13h2.75A2.75 2.75 0 0 1 9 15.75v3.5A2.75 2.75 0 0 1 6.25 22h-1.5A2.75 2.75 0 0 1 2 19.25v-7.5a9.63 9.63 0 0 1 2.937-6.901A10.13 10.13 0 0 1 12 2M3.5 19.25c0 .69.56 1.25 1.25 1.25h1.5c.69 0 1.25-.56 1.25-1.25v-3.5c0-.69-.56-1.25-1.25-1.25H3.5zm14.25-4.75c-.69 0-1.25.56-1.25 1.25v3.5c0 .69.56 1.25 1.25 1.25h1.5c.69 0 1.25-.56 1.25-1.25V14.5z"
                />
            </svg>
        );
    }
);
