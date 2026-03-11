import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconShieldAlert16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M8.007 10a1 1 0 010 2H8a1 1 0 010-2h.007zM8 4a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 4z" />
                    <path
                        fillRule="evenodd"
                        d="M7.26.213a2.25 2.25 0 011.48 0l4.75 1.653A2.25 2.25 0 0115 3.991V8c0 2.049-1.18 3.748-2.45 4.992-1.281 1.256-2.758 2.15-3.573 2.598a2.023 2.023 0 01-1.954 0c-.815-.447-2.292-1.342-3.573-2.598C2.18 11.748 1 10.048 1 8V3.991c0-.957.606-1.81 1.51-2.125L7.26.213zm.986 1.417a.75.75 0 00-.492 0l-4.75 1.653a.75.75 0 00-.504.708V8c0 1.456.847 2.791 2 3.92 1.141 1.12 2.483 1.938 3.244 2.354.163.09.35.09.512 0 .76-.416 2.103-1.235 3.244-2.353 1.153-1.13 2-2.465 2-3.921V3.991a.75.75 0 00-.504-.708L8.246 1.63z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
