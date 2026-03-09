import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCrop24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M5.75.5a.75.75 0 01.75.75V5h9.75A2.75 2.75 0 0119 7.75v9.75h3.75a.75.75 0 010 1.5H19v3.75a.75.75 0 01-1.5 0V19H7.75A2.75 2.75 0 015 16.25V6.5H1.25a.75.75 0 010-1.5H5V1.25A.75.75 0 015.75.5zm.75 15.75a1.25 1.25 0 001.25 1.25h9.75V7.75a1.25 1.25 0 00-1.25-1.25H6.5v9.75z"
                />
            </svg>
        );
    }
);
