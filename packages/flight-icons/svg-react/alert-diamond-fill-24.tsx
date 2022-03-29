import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAlertDiamondFill24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.945 1.924a2.75 2.75 0 00-3.89 0l-8.131 8.132a2.75 2.75 0 000 3.889l8.132 8.131a2.75 2.75 0 003.889 0l8.131-8.131a2.75 2.75 0 000-3.89l-8.131-8.13zM11.25 7.75a.75.75 0 011.5 0v4.5a.75.75 0 01-1.5 0v-4.5zM11 16a1 1 0 011-1h.01a1 1 0 110 2H12a1 1 0 01-1-1z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
