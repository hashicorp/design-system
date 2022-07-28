import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconDigitalOceanColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill="#0080FF">
                    <path d="M12 18.011V21.8c6.422 0 11.411-6.2 9.311-12.933-.911-2.934-3.256-5.267-6.189-6.19C8.4.578 2.2 5.578 2.2 11.99h3.789c0-4.022 3.989-7.133 8.222-5.6A5.68 5.68 0 0117.6 9.778c1.543 4.23-1.572 8.215-5.589 8.222v-3.767H8.233v3.778H12z" />
                    <path d="M8.233 20.922h-2.91v-2.91h2.91v2.91zM2.889 18.011h2.433v-2.433H2.89v2.433z" />
                </g>
            </svg>
        );
    }
);
