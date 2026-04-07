import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconZapOff24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M1.22 1.22a.75.75 0 0 1 1.06 0L16.56 15.5l.032.024a.8.8 0 0 1 .12.128l6.068 6.068a.75.75 0 0 1 0 1.06.75.75 0 0 1-1.06 0l-5.565-5.563-4.607 5.515a.754.754 0 0 1-.881.204.75.75 0 0 1-.437-.792l.918-6.409-8.481-.939a.751.751 0 0 1-.492-1.227l4.704-5.63-5.66-5.659a.75.75 0 0 1 0-1.06m3.002 12.24 7.86.87a.76.76 0 0 1 .51.286c.124.16.179.366.15.566l-.653 4.562 3.002-3.593-7.148-7.146zm10.75-4.96 6.36.705c.274.031.51.21.613.466a.75.75 0 0 1-.12.76l-2.57 3.075a.751.751 0 0 1-1.151-.962l1.674-2.002-4.97-.55a.751.751 0 0 1 .165-1.492m-2.52-7.23a.75.75 0 0 1 1.319.587l-.708 4.932a.753.753 0 0 1-.848.637.75.75 0 0 1-.636-.849l.332-2.321-.877 1.05a.75.75 0 0 1-1.151-.96z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
