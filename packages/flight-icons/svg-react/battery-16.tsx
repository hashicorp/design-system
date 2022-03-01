import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconBattery16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path
                        fillRule="evenodd"
                        d="M2.25 3A2.25 2.25 0 000 5.25v5.5A2.25 2.25 0 002.25 13h8.5A2.25 2.25 0 0013 10.75v-5.5A2.25 2.25 0 0010.75 3h-8.5zM1.5 5.25a.75.75 0 01.75-.75h8.5a.75.75 0 01.75.75v5.5a.75.75 0 01-.75.75h-8.5a.75.75 0 01-.75-.75v-5.5z"
                        clipRule="evenodd"
                    />
                    <path d="M15.5 6.75a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5z" />
                </g>
            </svg>
        );
    }
);
