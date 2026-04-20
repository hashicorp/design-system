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
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M1.219 1.22a.75.75 0 0 1 1.06 0l20.5 20.5a.75.75 0 0 1 0 1.06.753.753 0 0 1-1.06 0l-6.175-6.174a.75.75 0 0 1-.499-.136 5.255 5.255 0 0 0-6.082 0 .75.75 0 0 1-.868-1.223 6.75 6.75 0 0 1 4.92-1.17l-3.308-3.308a10.26 10.26 0 0 0-4.228 2.106.75.75 0 0 1-.96-1.152A11.8 11.8 0 0 1 8.488 9.55l-2.72-2.72a15.3 15.3 0 0 0-3.853 2.48.75.75 0 0 1-.992-1.125 16.8 16.8 0 0 1 3.718-2.482L1.219 2.28a.75.75 0 0 1 0-1.06M12.009 19c.552.001 1 .449 1 1 0 .552-.449 1-1 1H12a1 1 0 0 1 0-2zm2.268-9.045a.75.75 0 0 1 .925-.52 11.8 11.8 0 0 1 4.357 2.287c.316.266.36.738.097 1.056a.753.753 0 0 1-1.057.097 10.3 10.3 0 0 0-3.802-1.996.75.75 0 0 1-.52-.924M11.999 4c4.078 0 8.018 1.488 11.077 4.184.308.274.339.749.066 1.059a.753.753 0 0 1-1.059.066A15.25 15.25 0 0 0 9.858 5.652a.75.75 0 1 1-.21-1.485Q10.81 4.002 11.998 4"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
