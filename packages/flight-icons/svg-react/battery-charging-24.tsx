import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconBatteryCharging24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M11.944 4.997a.75.75 0 1 1 1.113 1.006l-3.96 4.377 5.374 1.653a.75.75 0 0 1 .357 1.195l-4.75 5.75a.75.75 0 0 1-1.156-.956l4.035-4.885-5.428-1.67a.75.75 0 0 1-.335-1.22zM8.25 5a.75.75 0 0 1 0 1.5h-4.5c-.69 0-1.25.56-1.25 1.25v8.5c0 .69.56 1.25 1.25 1.25h2.5a.75.75 0 0 1 0 1.5h-2.5A2.75 2.75 0 0 1 1 16.25v-8.5A2.75 2.75 0 0 1 3.75 5zm10 0A2.75 2.75 0 0 1 21 7.75v8.5A2.75 2.75 0 0 1 18.25 19h-4.5a.75.75 0 0 1 0-1.5h4.5c.69 0 1.25-.56 1.25-1.25v-8.5c0-.69-.56-1.25-1.25-1.25h-2.5a.75.75 0 0 1 0-1.5zm4.5 5a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 .75-.75"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
