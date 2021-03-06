import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconLock16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M8 9.25a.75.75 0 01.75.75v1a.75.75 0 01-1.5 0v-1A.75.75 0 018 9.25z" />
                    <path
                        fillRule="evenodd"
                        d="M4 5.014v-.93c0-1.078.417-2.114 1.165-2.881A3.96 3.96 0 018 0a3.96 3.96 0 012.835 1.203A4.127 4.127 0 0112 4.083v.93a2.25 2.25 0 012 2.237v5.5A2.25 2.25 0 0111.75 15h-7.5A2.25 2.25 0 012 12.75v-5.5a2.25 2.25 0 012-2.236zM6.239 2.25A2.46 2.46 0 018 1.5c.657 0 1.29.267 1.761.75.471.483.739 1.142.739 1.833V5h-5v-.917c0-.69.268-1.35.739-1.833zM11.75 6.5a.75.75 0 01.75.75v5.5a.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75v-5.5a.75.75 0 01.75-.75h7.5z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
