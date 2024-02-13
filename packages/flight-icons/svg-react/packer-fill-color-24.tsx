import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPackerFillColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#02A8EF"
                    fillRule="evenodd"
                    d="M2 0a2 2 0 00-2 2v20a2 2 0 002 2h20a2 2 0 002-2V2a2 2 0 00-2-2H2zm12.925 7.247L9.163 4v2.252l3.92 2.216v6.764l1.843 1.036c1.14.644 2.074.265 2.074-.858v-4.963c-.001-1.115-.937-2.554-2.075-3.2zM7 5.956l5.3 2.997V20L7 17.003V5.956z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
