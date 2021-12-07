import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPackerColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill="#02A8EF">
                    <path
                        fillRule="evenodd"
                        d="M3 1.956l5.3 2.997V16L3 13.003V1.956z"
                        clipRule="evenodd"
                    />
                    <path d="M10.925 3.247L5.163 0v2.252l3.92 2.216v6.764l1.843 1.036c1.14.644 2.074.265 2.074-.858V6.447c-.001-1.115-.937-2.554-2.075-3.2z" />
                </g>
            </svg>
        );
    }
);
