import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconFrown16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0m0 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13M8 9c.965 0 1.72.403 2.215.777.248.189.441.377.573.52q.118.125.22.264a.75.75 0 0 1-.17 1.047.76.76 0 0 1-1.046-.169 2.7 2.7 0 0 0-.483-.466c-.33-.251-.775-.473-1.31-.473-.533 0-.978.222-1.309.473a2.5 2.5 0 0 0-.484.468.75.75 0 0 1-1.215-.88h.001c.217-.3.499-.562.792-.784C6.278 9.403 7.034 9 8 9M6.007 5a1 1 0 0 1 0 2H6a1 1 0 0 1 0-2zm4 0a1 1 0 0 1 0 2H10a1 1 0 0 1 0-2z"
                />
            </svg>
        );
    }
);
