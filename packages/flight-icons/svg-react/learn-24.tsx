import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconLearn24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M11.633 3.096a.75.75 0 0 1 .734 0l10.25 5.75a.751.751 0 0 1 0 1.308l-2.82 1.582a.75.75 0 0 1 .203.514v5c0 .099-.02.198-.058.289l-.692-.289c.63.263.686.288.691.29v.004l-.003.006-.007.014-.02.044q-.024.052-.07.133a4 4 0 0 1-.269.42 5.6 5.6 0 0 1-1.21 1.194C17.2 20.21 15.312 21 12.346 21c-2.968 0-5.007-.79-6.319-1.615a7.6 7.6 0 0 1-1.426-1.147 5 5 0 0 1-.466-.558l-.009-.014-.003-.005-.002-.002c.005-.003.06-.041.629-.409l-.63.407A.75.75 0 0 1 4 17.25v-5a.75.75 0 0 1 .203-.514l-2.82-1.582a.751.751 0 0 1 0-1.308zm.734 12.808a.75.75 0 0 1-.734 0L5.5 12.464v4.533q.07.084.183.202c.232.242.604.577 1.143.916 1.072.675 2.833 1.385 5.52 1.385s4.252-.71 5.128-1.354c.442-.325.721-.644.886-.87q.093-.127.14-.21v-4.602zM3.283 9.5 12 14.39l8.717-4.89L12 4.61z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
