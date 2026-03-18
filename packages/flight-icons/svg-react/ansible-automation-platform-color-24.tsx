import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAnsibleAutomationPlatformColor24 = forwardRef<
    SVGSVGElement,
    IconProps
>(({ color = 'currentColor', title, ...props }, svgRef) => {
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
                fill="#e00"
                d="M12 22.496c-5.79 0-10.501-4.711-10.501-10.501S6.209 1.492 12 1.492s10.502 4.712 10.502 10.503c0 5.79-4.711 10.501-10.502 10.501M12 3c-4.959 0-8.994 4.034-8.994 8.994S7.041 20.988 12 20.988s8.994-4.034 8.994-8.994S16.959 3 12 3"
            />
            <path
                fill="#001d6c"
                d="M8.25 16.496a.75.75 0 0 1-.682-1.06l3.75-8.25a.75.75 0 0 1 1.364 0l3.75 8.25a.75.75 0 0 1-1.127.913l-4.872-3.594-1.5 3.301a.75.75 0 0 1-.684.44m2.818-5.136 2.805 2.07L12 9.308z"
            />
        </svg>
    );
});
