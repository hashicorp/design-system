import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconBookmarkFill24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
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
                    d="M6.75 2A2.75 2.75 0 004 4.75v16.376a1 1 0 001.382.924l6.522-2.699a.25.25 0 01.192 0l6.522 2.699A1 1 0 0020 21.126V4.75A2.75 2.75 0 0017.25 2H6.75z"
                />
            </svg>
        );
    }
);
