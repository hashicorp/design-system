import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconArrowRight24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12.21 3.979a.75.75 0 0 1 1.061-.018l7.5 7.25a.75.75 0 0 1 0 1.078l-7.5 7.25a.75.75 0 0 1-1.043-1.078l6.167-5.96H3.75a.75.75 0 0 1 0-1.5h14.645L12.23 5.038a.75.75 0 0 1-.018-1.06"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
