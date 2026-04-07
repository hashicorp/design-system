import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconBatteryCharging16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M6.396 3.057a.75.75 0 1 1 1.208.887l-2.141 2.92 3.524 1.174a.752.752 0 0 1 .367 1.156l-2.75 3.75a.75.75 0 0 1-1.209-.887l2.142-2.921-3.524-1.174a.75.75 0 0 1-.478-.484.75.75 0 0 1 .11-.671zM2.75 3a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 0-.75.75v5.5c.001.413.337.75.75.75h.5a.75.75 0 0 1 0 1.5h-.5A2.25 2.25 0 0 1 0 10.75v-5.5A2.25 2.25 0 0 1 2.25 3zm8 0A2.25 2.25 0 0 1 13 5.25v5.5A2.25 2.25 0 0 1 10.75 13h-.5a.75.75 0 0 1 0-1.5h.5a.75.75 0 0 0 .75-.75v-5.5a.75.75 0 0 0-.75-.75h-.5a.75.75 0 0 1 0-1.5zm4 3a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-.75.75.75.75 0 0 1-.75-.75v-2.5a.75.75 0 0 1 .75-.75"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
