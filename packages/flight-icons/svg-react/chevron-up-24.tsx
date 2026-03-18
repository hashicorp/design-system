import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconChevronUp24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 8c.203 0 .4.084.54.23l6.25 6.5a.753.753 0 0 1-.02 1.061.75.75 0 0 1-1.061-.021l-5.71-5.938-5.71 5.938a.75.75 0 0 1-1.081-1.039l6.25-6.5A.76.76 0 0 1 12 8"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
