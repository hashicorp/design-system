import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconChannel16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M10.556 3.75a2.25 2.25 0 10.178-1.5H9A2.75 2.75 0 006.25 5v2.25h-.878a2.25 2.25 0 100 1.5h.878V11A2.75 2.75 0 009 13.75h1.734a2.25 2.25 0 10-.178-1.5H9c-.69 0-1.25-.56-1.25-1.25V8.75h1.628a2.25 2.25 0 100-1.5H7.75V5c0-.69.56-1.25 1.25-1.25h1.556zM12 3.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM2.5 8A.75.75 0 014 7.986v.028A.75.75 0 012.5 8zm9.5 4.75a.75.75 0 111.5 0 .75.75 0 01-1.5 0zm-.5-5.5a.75.75 0 100 1.5.75.75 0 000-1.5z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
