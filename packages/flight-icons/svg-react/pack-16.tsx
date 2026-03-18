import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPack16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="m8.2 4.366 2.2-1.31c.06-.03.13-.051.2-.051.22 0 .4.185.4.412v2.62c0 .154-.08.288-.2.36L8.2 7.944a.4.4 0 0 1-.4 0L5.2 6.397a.45.45 0 0 1-.2-.36v-2.62c0-.072.01-.144.05-.206a.39.39 0 0 1 .55-.155l2.2 1.31c.12.072.28.072.4 0M4.3 9.866l-2.2-1.31a.39.39 0 0 0-.55.155.37.37 0 0 0-.05.206v2.62c0 .144.08.278.2.36l2.6 1.547c.12.072.28.072.4 0l2.6-1.547c.12-.072.2-.206.2-.36v-2.62a.41.41 0 0 0-.4-.412c-.07 0-.14.02-.2.051l-2.2 1.31a.4.4 0 0 1-.4 0M11.3 9.866l-2.2-1.31a.39.39 0 0 0-.55.155.37.37 0 0 0-.05.206v2.62c0 .144.08.278.2.36l2.6 1.547c.12.072.28.072.4 0l2.6-1.547c.12-.072.2-.206.2-.36v-2.62a.41.41 0 0 0-.4-.412c-.07 0-.14.02-.2.051l-2.2 1.31a.4.4 0 0 1-.4 0" />
                </g>
            </svg>
        );
    }
);
