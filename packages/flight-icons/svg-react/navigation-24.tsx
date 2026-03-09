import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconNavigation24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M20.929 2.073a.754.754 0 01.851.148.755.755 0 01.148.851l-8.764 18.5a.755.755 0 01-.75.425.755.755 0 01-.655-.564L9.92 14.08l-7.353-1.839a.754.754 0 01-.564-.653.754.754 0 01.425-.752l18.5-8.763zM4.965 11.295l5.756 1.438a.755.755 0 01.546.546l1.44 5.757 6.966-14.708-14.708 6.967z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
