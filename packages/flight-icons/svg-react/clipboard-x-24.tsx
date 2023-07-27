import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconClipboardX24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8.75 1A1.75 1.75 0 007 2.75V3H5.75A2.75 2.75 0 003 5.75v14.5A2.75 2.75 0 005.75 23h12.5A2.75 2.75 0 0021 20.25V5.75A2.75 2.75 0 0018.25 3H17v-.25A1.75 1.75 0 0015.25 1h-6.5zM8.5 2.75a.25.25 0 01.25-.25h6.5a.25.25 0 01.25.25v1.5a.25.25 0 01-.25.25h-6.5a.25.25 0 01-.25-.25v-1.5zm7.53 7.22a.75.75 0 00-1.06 0L12 12.94 9.03 9.97a.75.75 0 00-1.06 1.06L10.94 14l-2.97 2.97a.75.75 0 101.06 1.06L12 15.06l2.97 2.97a.75.75 0 101.06-1.06L13.06 14l2.97-2.97a.75.75 0 000-1.06z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
