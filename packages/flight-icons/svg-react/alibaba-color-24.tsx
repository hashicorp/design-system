import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAlibabaColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill="#ED6B1E">
                    <path d="M15.21 11.248H8.806v1.44h6.406v-1.44z" />
                    <path d="M18.405 6h-4.233l1.023 1.456 3.098.944c.576.176.943.72.927 1.28v4.64a1.34 1.34 0 01-.927 1.28l-3.082.944L14.172 18h4.233a3.196 3.196 0 003.195-3.2V9.2c.016-1.76-1.422-3.2-3.195-3.2zM5.595 6h4.233L8.805 7.456 5.722 8.4c-.575.176-.942.72-.926 1.28v4.64c0 .576.367 1.104.926 1.28l3.083.944L9.828 18H5.595A3.207 3.207 0 012.4 14.8V9.2C2.4 7.44 3.838 6 5.595 6z" />
                </g>
            </svg>
        );
    }
);
