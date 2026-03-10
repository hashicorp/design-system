import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAlertDiamond24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M10.055 1.885a2.753 2.753 0 013.89 0l8.17 8.17a2.753 2.753 0 010 3.89l-8.17 8.171a2.753 2.753 0 01-3.89 0l-8.171-8.17a2.753 2.753 0 010-3.89l8.17-8.171zm2.829 1.06a1.253 1.253 0 00-1.769 0l-8.17 8.171a1.253 1.253 0 000 1.769l8.17 8.17c.488.488 1.28.488 1.769 0l8.17-8.17a1.252 1.252 0 000-1.768l-8.17-8.172zM12.01 15c.55 0 .999.449 1 1-.001.551-.449 1-1 1H12c-.551 0-1-.449-1-1 0-.551.449-1 1-1h.01zM12 7c.413 0 .75.337.75.75v4.5c0 .413-.337.75-.75.75a.752.752 0 01-.75-.75v-4.5c0-.413.337-.75.75-.75z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
