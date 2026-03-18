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
                    d="M15.25 1c.966 0 1.75.784 1.75 1.75V3h1.25A2.75 2.75 0 0 1 21 5.75v14.5A2.75 2.75 0 0 1 18.25 23H5.75A2.75 2.75 0 0 1 3 20.25V5.75A2.75 2.75 0 0 1 5.75 3H7v-.25C7 1.784 7.784 1 8.75 1zm.78 8.97a.75.75 0 0 0-1.06 0L12 12.94 9.03 9.97a.75.75 0 1 0-1.06 1.06L10.94 14l-2.97 2.97a.75.75 0 1 0 1.06 1.06L12 15.06l2.97 2.97a.75.75 0 1 0 1.06-1.06L13.06 14l2.97-2.97a.75.75 0 0 0 0-1.06M8.75 2.5a.25.25 0 0 0-.25.25v1.5c0 .138.112.25.25.25h6.5a.25.25 0 0 0 .25-.25v-1.5a.25.25 0 0 0-.25-.25z"
                />
            </svg>
        );
    }
);
