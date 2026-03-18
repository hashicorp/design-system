import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconUnlock24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M18 1c1.58 0 3.102.597 4.23 1.67A5.63 5.63 0 0 1 24 6.75a.75.75 0 0 1-1.5 0 4.13 4.13 0 0 0-1.305-2.992A4.64 4.64 0 0 0 18 2.5a4.64 4.64 0 0 0-3.195 1.258A4.13 4.13 0 0 0 13.5 6.75V10h.75A2.75 2.75 0 0 1 17 12.75v7.5A2.75 2.75 0 0 1 14.25 23H3.75A2.75 2.75 0 0 1 1 20.25v-7.5A2.75 2.75 0 0 1 3.75 10H12V6.75c0-1.537.642-3.004 1.77-4.08A6.14 6.14 0 0 1 18 1M3.75 11.5c-.69 0-1.25.56-1.25 1.25v7.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-7.5c0-.69-.56-1.25-1.25-1.25z"
                />
            </svg>
        );
    }
);
