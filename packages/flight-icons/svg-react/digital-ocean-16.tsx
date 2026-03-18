import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconDigitalOcean16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M8 12.208v2.652c4.495 0 7.988-4.34 6.518-9.053a6.64 6.64 0 0 0-4.333-4.333C5.48.004 1.14 3.504 1.14 7.992h2.652c0-2.815 2.792-4.993 5.756-3.92a3.98 3.98 0 0 1 2.372 2.372c1.08 2.961-1.1 5.75-3.912 5.756V9.563H5.363v2.645z" />
                    <path d="M5.363 14.246H3.325v-2.038h2.038zM1.622 12.208h1.703v-1.703H1.622z" />
                </g>
            </svg>
        );
    }
);
