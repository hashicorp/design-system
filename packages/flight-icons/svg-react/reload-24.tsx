import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconReload24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M11.2.24A.75.75 0 0 1 12.26.2l3.5 3.25a.753.753 0 0 1 0 1.1l-3.5 3.25a.752.752 0 0 1-1.021-1.1l2.218-2.058a7.5 7.5 0 1 0 5.532 4.632.75.75 0 0 1 1.397-.546A9.001 9.001 0 1 1 3 12a9 9 0 0 1 10.15-8.927L11.24 1.3A.75.75 0 0 1 11.2.24"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
