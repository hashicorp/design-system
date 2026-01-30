import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCloudability16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 1a7 7 0 110 14A7 7 0 018 1zm1.05 4.025c-1.04 0-1.736.858-1.75.875-.005-.001-1.051-.174-1.75.35-.691.519-.87 1.379-.875 1.4 0 0-1.4.175-1.4 1.575s1.4 1.575 1.4 1.575H11.5s1.05-.35 1.05-1.575-1.05-1.4-1.05-1.4V6.6L9.4 8.35l-.874-.875-3.676 2.1L8.526 6.25l.875.875L10.8 5.9c-.013-.016-.71-.875-1.75-.875z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
