import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconArrowLeft24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
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
                    d="M11.771 5.04a.75.75 0 00-1.042-1.08l-7.5 7.25a.75.75 0 000 1.08l7.5 7.25a.75.75 0 101.042-1.08L5.605 12.5H20.25a.75.75 0 000-1.5H5.605l6.166-5.96z"
                />
            </svg>
        );
    }
);
