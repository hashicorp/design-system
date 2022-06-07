import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconStarOff16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M8.67.912a.75.75 0 00-1.34 0l-.882 1.75a.75.75 0 001.34.676L8 2.916 9.57 6.03c.11.219.321.37.564.405l3.48.498-1.299 1.238a.75.75 0 101.035 1.086l2.418-2.305a.75.75 0 00-.412-1.285l-4.622-.662L8.67.912z" />
                    <path
                        fillRule="evenodd"
                        d="M13.147 14.207l.072.413a.75.75 0 01-1.082.797L8 13.287l-4.137 2.13a.75.75 0 01-1.082-.796l.786-4.489-3.335-3.18a.75.75 0 01.412-1.284l3.467-.496L1.22 2.28a.75.75 0 111.06-1.06l12.5 12.5a.75.75 0 01-1.06 1.06l-.573-.572zm-7.71-7.71l-3.051.437 2.507 2.39a.75.75 0 01.22.672l-.594 3.396 3.138-1.616a.75.75 0 01.686 0l3.138 1.616-.18-1.03-5.865-5.865z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
