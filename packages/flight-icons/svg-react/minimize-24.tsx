import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconMinimize24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M20.78 4.28a.75.75 0 00-1.06-1.06L14.5 8.44V4.75a.75.75 0 00-1.5 0v5.5a.747.747 0 00.75.75h5.5a.75.75 0 000-1.5h-3.69l5.22-5.22zM4 13.75c0 .414.336.75.75.75h3.69l-5.22 5.22a.75.75 0 101.06 1.06l5.22-5.22v3.69a.75.75 0 001.5 0v-5.5a.747.747 0 00-.215-.525l-.01-.01A.747.747 0 0010.25 13h-5.5a.75.75 0 00-.75.75z" />
                </g>
            </svg>
        );
    }
);
