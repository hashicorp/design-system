import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconUserCircleFill16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 .25a7.75 7.75 0 110 15.5A7.75 7.75 0 018 .25zM5.625 9c-.808 0-1.595.293-2.186.833-.527.483-.939 1.048-.939 1.917a.75.75 0 001.5 0c0-.284.09-.477.452-.81.3-.275.722-.44 1.173-.44h4.75c.451 0 .872.165 1.173.44.363.333.452.526.452.81a.75.75 0 001.5 0c0-.869-.412-1.434-.94-1.917A3.24 3.24 0 0010.375 9h-4.75zM8 2a3 3 0 100 6 3 3 0 000-6zm0 1.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
                />
            </svg>
        );
    }
);
