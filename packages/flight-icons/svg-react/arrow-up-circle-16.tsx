import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconArrowUpCircle16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M4.695 7.755a.75.75 0 001.06.05l1.495-1.36v4.805a.75.75 0 001.5 0V6.445l1.495 1.36a.75.75 0 001.01-1.11l-2.75-2.5a.75.75 0 00-1.01 0l-2.75 2.5a.75.75 0 00-.05 1.06z" />
                    <path
                        fillRule="evenodd"
                        d="M0 8a8 8 0 1116 0A8 8 0 010 8zm8-6.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
