import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconPlayCircle16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color} fillRule="evenodd" clipRule="evenodd">
                    <path d="M7.421 4.356A1.25 1.25 0 005.5 5.411v5.178a1.25 1.25 0 001.921 1.055l4.069-2.59a1.25 1.25 0 000-2.109L7.42 4.356zM10.353 8L7 10.134V5.866L10.353 8z" />
                    <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z" />
                </g>
            </svg>
        );
    }
);
