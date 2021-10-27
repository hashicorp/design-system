import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconUserMinus16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
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
                        d="M2.5 5.5a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0zm3.5-2a2 2 0 100 4 2 2 0 000-4z"
                        clipRule="evenodd"
                    />
                    <path d="M.5 13.75A3.75 3.75 0 014.25 10h3.5a3.75 3.75 0 013.75 3.75v.5a.75.75 0 01-1.5 0v-.5a2.25 2.25 0 00-2.25-2.25h-3.5A2.25 2.25 0 002 13.75v.5a.75.75 0 01-1.5 0v-.5zM11.25 7.5a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z" />
                </g>
            </svg>
        );
    }
);
