import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPacker16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M5.163 0l5.762 3.247c1.138.646 2.074 2.085 2.075 3.2v4.963c0 1.123-.933 1.502-2.074.858L9.083 11.23V4.469l-3.92-2.216V0z" />
                    <path d="M8.3 4.953L3 1.956v11.047L8.3 16V4.953z" />
                </g>
            </svg>
        );
    }
);
