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
                    d="M13.929 1.074a.754.754 0 01.851.147.755.755 0 01.148.852l-5.921 12.5a.755.755 0 01-.752.424.755.755 0 01-.653-.564L6.395 9.607 1.568 8.4a.756.756 0 01-.564-.654.754.754 0 01.425-.752l12.5-5.92zm-9.964 6.38l3.23.806a.755.755 0 01.545.546l.808 3.23 4.125-8.708-8.708 4.125z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
