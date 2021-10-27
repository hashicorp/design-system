import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconArrowUpCircle24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
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
                <g fill={color}>
                    <path d="M12.75 8.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 001.09 1.03l2.955-3.129v8.614a.75.75 0 001.5 0V8.636z" />
                    <path
                        fillRule="evenodd"
                        d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm11-9.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
