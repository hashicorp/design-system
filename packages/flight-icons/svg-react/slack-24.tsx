import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSlack24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color} fillRule="evenodd" clipRule="evenodd">
                    <path d="M4.101 16.74a2.106 2.106 0 0 0 2.101-2.101v-2.101H4.101a2.106 2.106 0 0 0-2.1 2.1 2.106 2.106 0 0 0 2.1 2.102m5.26-4.202a2.106 2.106 0 0 0-2.1 2.1V19.9A2.106 2.106 0 0 0 9.362 22a2.106 2.106 0 0 0 2.1-2.1v-5.262a2.106 2.106 0 0 0-2.1-2.1M7.26 4.101a2.106 2.106 0 0 0 2.102 2.101h2.1V4.101a2.106 2.106 0 0 0-2.1-2.1A2.106 2.106 0 0 0 7.26 4.1m4.203 5.26a2.106 2.106 0 0 0-2.101-2.1H4.1A2.106 2.106 0 0 0 2 9.362a2.106 2.106 0 0 0 2.1 2.1h5.262a2.106 2.106 0 0 0 2.1-2.1M14.639 11.463a2.106 2.106 0 0 0 2.1-2.101V4.1a2.106 2.106 0 0 0-2.1-2.1 2.106 2.106 0 0 0-2.101 2.1v5.262a2.106 2.106 0 0 0 2.1 2.1m5.26-4.202a2.106 2.106 0 0 0-2.1 2.1v2.102h2.1A2.106 2.106 0 0 0 22 9.362a2.106 2.106 0 0 0-2.1-2.101M12.538 14.639a2.106 2.106 0 0 0 2.1 2.1H19.9a2.106 2.106 0 0 0 2.1-2.1 2.106 2.106 0 0 0-2.1-2.101h-5.262a2.106 2.106 0 0 0-2.1 2.1m4.202 5.26a2.106 2.106 0 0 0-2.101-2.1h-2.101v2.1a2.106 2.106 0 0 0 2.1 2.101 2.106 2.106 0 0 0 2.102-2.1" />
                </g>
            </svg>
        );
    }
);
