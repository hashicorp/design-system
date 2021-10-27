import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconArrowDownCircle16 = forwardRef<SVGSVGElement, IconProps>(
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
                        d="M0 8a8 8 0 1116 0A8 8 0 010 8zm8-6.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13z"
                        clipRule="evenodd"
                    />
                    <path d="M5.755 8.195a.75.75 0 00-1.01 1.11l2.75 2.5a.748.748 0 001.01 0l2.75-2.5a.75.75 0 10-1.01-1.11L8.75 9.555V4.75a.75.75 0 00-1.5 0v4.805l-1.495-1.36z" />
                </g>
            </svg>
        );
    }
);
