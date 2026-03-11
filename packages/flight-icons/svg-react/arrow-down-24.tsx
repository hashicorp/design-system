import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconArrowDown24 = forwardRef<SVGSVGElement, IconProps>(
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
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M11.75 3c.413.001.75.336.75.75v14.645l5.96-6.166a.752.752 0 011.061-.018.753.753 0 01.018 1.06l-7.25 7.5a.753.753 0 01-1.078 0l-7.25-7.5a.75.75 0 011.078-1.043l5.96 6.167V3.75a.75.75 0 01.75-.75z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
