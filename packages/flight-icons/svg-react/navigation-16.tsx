import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconNavigation16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M14.78 1.22a.75.75 0 01.148.851l-5.921 12.5a.75.75 0 01-1.406-.14L6.395 9.606 1.568 8.4a.75.75 0 01-.14-1.406l12.501-5.92a.75.75 0 01.851.147zM3.965 7.452l3.23.807a.75.75 0 01.546.546l.807 3.23 4.125-8.708-8.708 4.125z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
