import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconFolderMinus16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M6.629 1a2.25 2.25 0 011.59.66l1.122 1.12c.14.14.331.22.53.22h3.879A2.25 2.25 0 0116 5.25v7.5A2.25 2.25 0 0113.75 15H2.25A2.25 2.25 0 010 12.75v-9.5A2.25 2.25 0 012.25 1h4.379zM2.25 2.5a.75.75 0 00-.75.75v9.5c0 .414.336.75.75.75h11.5a.75.75 0 00.75-.75v-7.5a.75.75 0 00-.75-.75H9.871a2.25 2.25 0 01-1.59-.66L7.158 2.72a.75.75 0 00-.53-.22H2.25zm8 5a.75.75 0 010 1.5h-4.5a.75.75 0 010-1.5h4.5z"
                />
            </svg>
        );
    }
);
