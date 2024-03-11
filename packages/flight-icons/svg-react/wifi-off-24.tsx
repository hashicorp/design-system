import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconWifiOff24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M1.22 1.22a.75.75 0 011.06 0l20.5 20.5a.75.75 0 11-1.06 1.06l-6.175-6.174a.747.747 0 01-.5-.136 5.25 5.25 0 00-6.08 0 .75.75 0 01-.87-1.223 6.75 6.75 0 014.92-1.171l-3.307-3.307a10.249 10.249 0 00-4.228 2.105.75.75 0 01-.96-1.152A11.749 11.749 0 018.489 9.55l-2.72-2.72a15.247 15.247 0 00-3.853 2.48.75.75 0 11-.992-1.125 16.746 16.746 0 013.718-2.482L1.22 2.28a.75.75 0 010-1.06zM12 5.5c-.72 0-1.436.051-2.142.151a.75.75 0 01-.21-1.485 16.75 16.75 0 0113.428 4.019.75.75 0 01-.992 1.125A15.25 15.25 0 0012 5.5zM14.278 9.954a.75.75 0 01.924-.52 11.749 11.749 0 014.358 2.288.75.75 0 11-.96 1.152 10.247 10.247 0 00-3.802-1.996.75.75 0 01-.52-.924zM12 19a1 1 0 100 2h.01a1 1 0 100-2H12z" />
                </g>
            </svg>
        );
    }
);
