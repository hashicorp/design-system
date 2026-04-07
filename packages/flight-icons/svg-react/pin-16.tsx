import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPin16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M9.12 1.4a1.25 1.25 0 0 1 1.76.008l3.709 3.708c.486.488.486 1.28 0 1.768l-2.015 2.015a.76.76 0 0 1-.53.218h-1.16L9.45 10.55l-.247 2.231c-.103.923-1.16 1.432-1.945.88-.578-.408-1.459-1.052-2.18-1.68l-2.799 2.8a.75.75 0 0 1-1.06-1.06l2.798-2.8c-.627-.721-1.27-1.602-1.68-2.18-.553-.786-.043-1.842.88-1.945l2.232-.247 1.386-1.387V3.956a.75.75 0 0 1 .224-.535zm-.784 2.87v1.203c0 .198-.08.39-.22.53L6.324 7.795a.76.76 0 0 1-.447.215l-2.053.228c.516.713 1.202 1.61 1.765 2.173s1.46 1.25 2.172 1.765l.229-2.053a.75.75 0 0 1 .215-.447l1.838-1.839c.14-.14.332-.22.53-.22h1.16L13.35 6 9.995 2.644z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
