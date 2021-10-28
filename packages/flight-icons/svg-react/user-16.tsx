import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconUser16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path
                        fillRule="evenodd"
                        d="M8 1a4 4 0 100 8 4 4 0 000-8zM5.5 5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z"
                        clipRule="evenodd"
                    />
                    <path d="M5.25 10a3.75 3.75 0 00-3.75 3.75v.5a.75.75 0 001.5 0v-.5a2.25 2.25 0 012.25-2.25h5.5A2.25 2.25 0 0113 13.75v.5a.75.75 0 001.5 0v-.5A3.75 3.75 0 0010.75 10h-5.5z" />
                </g>
            </svg>
        );
    }
);
