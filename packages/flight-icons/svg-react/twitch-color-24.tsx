import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconTwitchColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#fff"
                    d="m19.857 11.214-3.143 3.143h-3.143l-2.75 2.75v-2.75H7.286V2.571h12.571z"
                />
                <path
                    fill="#9146ff"
                    d="M6.5 1 2.57 4.929V19.07h4.715V23l3.928-3.929h3.143L21.428 12V1zm13.357 10.214-3.143 3.143h-3.143l-2.75 2.75v-2.75H7.286V2.571h12.571z"
                />
                <path
                    fill="#9146ff"
                    d="M17.5 5.321h-1.572v4.715H17.5zM13.178 5.321h-1.571v4.715h1.571z"
                />
            </svg>
        );
    }
);
