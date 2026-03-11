import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconTools16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8.75 0A2.25 2.25 0 0111 2.25V3h.79a2.25 2.25 0 011.608.678l1.961 2.008c.41.42.641.984.641 1.572v5.492A2.25 2.25 0 0113.75 15H2.25A2.25 2.25 0 010 12.75V7.258c0-.588.23-1.152.64-1.572l1.962-2.008A2.25 2.25 0 014.21 3H5v-.75A2.25 2.25 0 017.25 0h1.5zM1.5 12.75c0 .414.336.75.75.75h11.5a.75.75 0 00.75-.75V9.5h-4v.25c0 .69-.56 1.25-1.25 1.25h-2.5c-.69 0-1.25-.56-1.25-1.25V9.5h-4v3.25zM7 9.5h2V8H7v1.5zm-2.79-5a.75.75 0 00-.535.226L1.714 6.733a.751.751 0 00-.214.525V8h4v-.25c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25V8h4v-.742a.751.751 0 00-.214-.525l-1.96-2.007a.75.75 0 00-.537-.226H4.211zm3.04-3a.75.75 0 00-.75.75V3h3v-.75a.75.75 0 00-.75-.75h-1.5z"
                />
            </svg>
        );
    }
);
