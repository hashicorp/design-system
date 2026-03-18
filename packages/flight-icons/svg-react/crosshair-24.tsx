import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCrosshair24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1m.75 4.25a.75.75 0 0 1-1.5 0V2.53a9.5 9.5 0 0 0-8.72 8.72h2.72a.75.75 0 0 1 0 1.5H2.53a9.5 9.5 0 0 0 8.72 8.72v-2.72a.75.75 0 0 1 1.5 0v2.72a9.5 9.5 0 0 0 8.72-8.72h-2.72a.75.75 0 0 1 0-1.5h2.72a9.5 9.5 0 0 0-8.72-8.72z"
                />
            </svg>
        );
    }
);
