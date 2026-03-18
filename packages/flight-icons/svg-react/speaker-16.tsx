import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSpeaker16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color} fillRule="evenodd" clipRule="evenodd">
                    <path d="M8 5.55a3.95 3.95 0 1 0 0 7.9 3.95 3.95 0 0 0 0-7.9M5.45 9.5a2.55 2.55 0 1 1 5.1 0 2.55 2.55 0 0 1-5.1 0" />
                    <path d="M3.25 0A2.25 2.25 0 0 0 1 2.25v11.5A2.25 2.25 0 0 0 3.25 16h9.5A2.25 2.25 0 0 0 15 13.75V2.25A2.25 2.25 0 0 0 12.75 0zM2.5 2.25a.75.75 0 0 1 .75-.75h9.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-9.5a.75.75 0 0 1-.75-.75z" />
                </g>
            </svg>
        );
    }
);
