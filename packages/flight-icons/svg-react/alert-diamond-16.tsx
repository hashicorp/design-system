import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAlertDiamond16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M6.407.752a2.253 2.253 0 0 1 3.183 0l5.656 5.657a2.25 2.25 0 0 1 0 3.182L9.59 15.247a2.253 2.253 0 0 1-3.183 0L.751 9.591a2.25 2.25 0 0 1 0-3.182zm2.122 1.06a.75.75 0 0 0-1.06 0L1.81 7.47a.75.75 0 0 0 0 1.06l5.658 5.657a.75.75 0 0 0 1.06 0l5.656-5.657a.75.75 0 0 0 0-1.06zM8.007 10c.55.001.999.45 1 1 0 .551-.449 1-1 1H8c-.551 0-1-.449-1-1s.449-.999 1-1zM8 5c.413.001.75.337.75.75v2.5c0 .413-.337.75-.75.75a.75.75 0 0 1-.75-.75v-2.5c0-.413.337-.749.75-.75"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
