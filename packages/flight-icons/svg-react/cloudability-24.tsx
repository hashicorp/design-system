import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCloudability24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zm1.65 6.325c-1.646 0-2.745 1.37-2.75 1.375 0 0-1.65-.275-2.75.55-1.1.825-1.375 2.2-1.375 2.2s-2.2.275-2.2 2.475 2.2 2.475 2.2 2.475H17.5s1.65-.55 1.65-2.475-1.65-2.2-1.65-2.2V9.8l-3.3 2.75-1.375-1.375-5.775 3.3 5.775-5.225 1.375 1.375L16.4 8.7s-1.1-1.375-2.75-1.375z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
