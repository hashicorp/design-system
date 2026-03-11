import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconModule24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M17.68 2.028A2.75 2.75 0 0121 4.718V17.63a2.75 2.75 0 01-2.18 2.69l-12.5 2.652A2.75 2.75 0 013 20.282V7.37c0-1.298.91-2.42 2.18-2.69l12.5-2.652zm1.82 2.69a1.25 1.25 0 00-1.51-1.222L5.49 6.147A1.25 1.25 0 004.5 7.37v12.911a1.25 1.25 0 001.51 1.223l12.5-2.652a1.25 1.25 0 00.99-1.222V4.719zm-4.008 1.926A1.25 1.25 0 0117 7.866v7.69a1.25 1.25 0 01-.992 1.223l-7.5 1.578A1.25 1.25 0 017 17.134v-7.69c0-.59.414-1.102.992-1.223l7.5-1.577zM8.5 9.647v7.18l7-1.474V8.175l-7 1.472z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
