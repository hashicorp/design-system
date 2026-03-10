import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMicOff16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M1.22 1.22a.75.75 0 011.06 0l12.5 12.5a.751.751 0 01-1.06 1.06l-2.382-2.382A5.578 5.578 0 018.75 13.45v1.05h1.75a.75.75 0 010 1.5h-5a.75.75 0 010-1.5h1.75v-1.05a5.556 5.556 0 01-3.132-1.513A5.3 5.3 0 012.5 8.135V6.75a.75.75 0 011.5 0v1.385a3.8 3.8 0 001.164 2.725A4.073 4.073 0 008 12a4.1 4.1 0 002.262-.678l-.726-.725a3.118 3.118 0 01-3.64-.418A2.798 2.798 0 015 8.139V6.06L1.22 2.28a.75.75 0 010-1.061zM12.78 6c.414 0 .75.336.75.75v1.385c0 .266-.02.53-.06.79a.75.75 0 01-1.483-.227c.028-.185.043-.374.043-.563V6.75a.75.75 0 01.75-.75zM6.5 8.139c0 .345.145.686.422.946.278.26.665.415 1.078.415.134 0 .266-.017.392-.048L6.5 7.561v.578zM8 0c.78 0 1.539.29 2.104.821A2.8 2.8 0 0111 2.861v3.444a.751.751 0 01-1.5 0V2.86a1.3 1.3 0 00-.422-.946A1.58 1.58 0 008 1.5c-.413 0-.8.154-1.078.415-.129.12-.229.26-.299.407a.751.751 0 01-1.354-.644c.151-.319.363-.61.626-.857A3.08 3.08 0 018 0z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
