import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconNavigationAlt24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 2a.75.75 0 0 1 .698.477l7.25 18.5a.75.75 0 0 1-1.053.934L12 18.207l-6.895 3.704a.751.751 0 0 1-1.053-.934l7.25-18.5A.75.75 0 0 1 12 2M6.193 19.623l5.453-2.929a.75.75 0 0 1 .71 0l5.452 2.929L12 4.806z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
