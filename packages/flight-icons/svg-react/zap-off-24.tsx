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
                    d="M1.22 1.22a.75.75 0 0 1 1.06 0L16.56 15.5l.032.025a.8.8 0 0 1 .121.128l6.067 6.067a.75.75 0 0 1 0 1.06.75.75 0 0 1-1.06 0l-5.564-5.563-4.608 5.515a.754.754 0 0 1-.88.204.75.75 0 0 1-.438-.792l.918-6.408-8.48-.94a.751.751 0 0 1-.492-1.227l4.703-5.63-5.66-5.658a.75.75 0 0 1 0-1.061m3.002 12.24 7.86.87a.76.76 0 0 1 .511.287c.123.16.178.365.15.565l-.654 4.562 3.002-3.592-7.147-7.147zm10.75-4.96 6.36.705c.274.031.51.21.613.466a.75.75 0 0 1-.12.76l-2.569 3.075a.751.751 0 0 1-1.151-.962l1.674-2.002-4.971-.55a.751.751 0 0 1 .165-1.492m-2.52-7.23a.75.75 0 0 1 1.319.587l-.707 4.932a.753.753 0 0 1-.849.637.75.75 0 0 1-.636-.849l.332-2.32-.877 1.049a.75.75 0 0 1-1.151-.96z"
                />
            </svg>
        );
    }
);
