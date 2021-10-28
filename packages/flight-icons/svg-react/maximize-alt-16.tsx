import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconMaximizeAlt16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M1 3.25A2.25 2.25 0 013.25 1h2.047a.75.75 0 010 1.5H3.25a.75.75 0 00-.75.75v2.047a.75.75 0 01-1.5 0V3.25zm8.953-1.5a.75.75 0 01.75-.75h2.047A2.25 2.25 0 0115 3.25v2.047a.75.75 0 01-1.5 0V3.25a.75.75 0 00-.75-.75h-2.047a.75.75 0 01-.75-.75zM1.75 9.953a.75.75 0 01.75.75v2.047c0 .414.336.75.75.75h2.047a.75.75 0 010 1.5H3.25A2.25 2.25 0 011 12.75v-2.047a.75.75 0 01.75-.75zm12.5 0a.75.75 0 01.75.75v2.047A2.25 2.25 0 0112.75 15h-2.047a.75.75 0 010-1.5h2.047a.75.75 0 00.75-.75v-2.047a.75.75 0 01.75-.75z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
