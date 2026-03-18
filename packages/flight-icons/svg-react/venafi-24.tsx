import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconVenafi24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M15.966 3.216 16.042 3H23c-2.253 6.096-5.467 11.67-9.592 16.558L12 21.223l-1.408-1.665C6.467 14.671 3.253 9.096 1 3h6.809l.076.216c.162.465.532 1.527.752 2.02H4.545c1.533 4.15 3.72 7.944 6.527 11.274l.961 1.135.961-1.135c2.808-3.33 4.995-7.124 6.527-11.274h-4.307c.22-.493.59-1.555.752-2.02M12 11.822a21.7 21.7 0 0 0 2.916-5.136h2.26a26.1 26.1 0 0 1-4.513 7.786L12 15.26l-.663-.787a26 26 0 0 1-4.514-7.786h2.261A21.7 21.7 0 0 0 12 11.822"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
