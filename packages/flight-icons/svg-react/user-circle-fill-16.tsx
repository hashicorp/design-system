import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconUserCircleFill16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
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
                    d="M.25 8a7.75 7.75 0 1115.5 0A7.75 7.75 0 01.25 8zm3.19 1.833A3.24 3.24 0 015.624 9h4.75a3.24 3.24 0 012.186.833c.528.484.939 1.048.939 1.917a.75.75 0 01-1.5 0c0-.284-.09-.478-.452-.81-.3-.275-.722-.44-1.173-.44h-4.75c-.451 0-.872.165-1.173.44-.363.332-.452.526-.452.81a.75.75 0 01-1.5 0c0-.869.411-1.433.94-1.917zM6.5 5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8 2a3 3 0 100 6 3 3 0 000-6z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
