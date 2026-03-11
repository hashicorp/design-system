import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconShuffle16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M14.25 1a.75.75 0 01.528.218l.004.004A.752.752 0 0115 1.75v4a.75.75 0 01-1.5 0V3.56L2.28 14.78a.75.75 0 01-1.06-1.06L12.44 2.5h-2.19a.75.75 0 010-1.5h4zm0 8.5a.75.75 0 01.75.75v4a.75.75 0 01-.215.525l-.01.01a.75.75 0 01-.525.215h-4a.75.75 0 010-1.5h2.19l-2.47-2.47a.75.75 0 111.06-1.06l2.47 2.47v-2.19a.75.75 0 01.75-.75zM1.22 1.22a.75.75 0 011.06 0l3.75 3.75a.751.751 0 01-1.06 1.06L1.22 2.28a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
