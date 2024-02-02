import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconVaultFillColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill="#FFCF25">
                    <path d="M9.462 10.16h1.27V8.89h-1.27v1.27zM9.462 8.254h1.27V6.985h-1.27v1.269zM11.366 12.063h1.27v-1.27h-1.27v1.27zM11.366 10.16h1.27V8.89h-1.27v1.27zM11.366 8.254h1.27V6.985h-1.27v1.269zM13.26 10.16h1.27V8.89h-1.27v1.27zM13.26 6.985v1.269h1.27V6.985h-1.27z" />
                    <path
                        fillRule="evenodd"
                        d="M2 0a2 2 0 00-2 2v20a2 2 0 002 2h20a2 2 0 002-2V2a2 2 0 00-2-2H2zm9.971 19.516L4 4h16l-8.029 15.516z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
