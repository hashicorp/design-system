import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconStar16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M7.999.5c.282.001.543.16.67.412l2.063 4.094 4.624.662a.76.76 0 0 1 .608.514.76.76 0 0 1-.197.771l-3.335 3.18.787 4.487a.76.76 0 0 1-.295.735.75.75 0 0 1-.787.062l-4.138-2.13-4.137 2.13a.752.752 0 0 1-1.082-.797l.786-4.487-3.335-3.18a.75.75 0 0 1 .412-1.285l4.623-.662L7.329.912A.75.75 0 0 1 8 .5m-1.57 5.531a.76.76 0 0 1-.564.405l-3.48.498 2.507 2.39c.18.173.264.426.221.672l-.595 3.396 3.138-1.616a.76.76 0 0 1 .687 0l3.137 1.616-.594-3.396a.75.75 0 0 1 .22-.672l2.507-2.39-3.48-.498a.75.75 0 0 1-.564-.405L8 2.916z"
                />
            </svg>
        );
    }
);
