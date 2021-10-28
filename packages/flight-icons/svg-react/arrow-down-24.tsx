import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconArrowDown24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12.5 3.75a.75.75 0 00-1.5 0v14.645l-5.96-6.166a.75.75 0 00-1.08 1.042l7.25 7.5a.75.75 0 001.08 0l7.25-7.5a.75.75 0 10-1.08-1.042l-5.96 6.166V3.75z"
                />
            </svg>
        );
    }
);
