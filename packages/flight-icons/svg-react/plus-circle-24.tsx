import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconPlusCircle24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M11.75 6.75a.75.75 0 01.75.75V11H16a.75.75 0 010 1.5h-3.5V16a.75.75 0 01-1.5 0v-3.5H7.5a.75.75 0 010-1.5H11V7.5a.75.75 0 01.75-.75z" />
                    <path
                        fillRule="evenodd"
                        d="M1 11.75C1 5.813 5.813 1 11.75 1S22.5 5.813 22.5 11.75 17.687 22.5 11.75 22.5 1 17.687 1 11.75zM11.75 2.5a9.25 9.25 0 100 18.5 9.25 9.25 0 000-18.5z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
