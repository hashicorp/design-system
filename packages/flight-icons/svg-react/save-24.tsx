import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSave24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M14.922 2c.73 0 1.429.29 1.944.806l4.328 4.328A2.75 2.75 0 0122 9.078V19.25A2.75 2.75 0 0119.25 22H4.75A2.75 2.75 0 012 19.25V4.75A2.75 2.75 0 014.75 2h10.172zM4.75 3.5c-.69 0-1.25.56-1.25 1.25v14.5c0 .69.56 1.25 1.25 1.25H6v-6.75c0-.966.784-1.75 1.75-1.75h8.5c.966 0 1.75.784 1.75 1.75v6.75h1.25c.69 0 1.25-.56 1.25-1.25V9.078c0-.331-.132-.65-.366-.884l-4.328-4.328a1.25 1.25 0 00-.884-.366H7.5v3.75c0 .138.112.25.25.25h7.5a.75.75 0 010 1.5h-7.5A1.75 1.75 0 016 7.25V3.5H4.75zm3 10a.25.25 0 00-.25.25v6.75h9v-6.75a.25.25 0 00-.25-.25h-8.5z"
                />
            </svg>
        );
    }
);
