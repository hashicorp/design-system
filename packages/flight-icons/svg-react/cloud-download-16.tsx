import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCloudDownload16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 7.25a.755.755 0 0 1 .75.75v4.439l1.47-1.47a.754.754 0 0 1 1.06 0c.29.292.29.768 0 1.06l-2.75 2.75A.76.76 0 0 1 8 15a.76.76 0 0 1-.53-.22l-2.75-2.75a.753.753 0 0 1 0-1.06.754.754 0 0 1 1.06 0l1.47 1.47v-4.44A.754.754 0 0 1 8 7.25M3.93 1.37a6.045 6.045 0 0 1 6.24 1.28 6 6 0 0 1 1.504 2.286h.28A4.036 4.036 0 0 1 16 8.968a4.04 4.04 0 0 1-1.852 3.387.753.753 0 0 1-1.036-.225.754.754 0 0 1 .224-1.037A2.535 2.535 0 0 0 14.5 8.968a2.536 2.536 0 0 0-2.545-2.531h-.83a.754.754 0 0 1-.725-.563 4.51 4.51 0 0 0-3.466-3.283 4.536 4.536 0 0 0-4.488 1.654 4.5 4.5 0 0 0-.922 2.3 4.5 4.5 0 0 0 1.308 3.643c.292.29.294.766.005 1.06a.754.754 0 0 1-1.061.005A5.995 5.995 0 0 1 .03 6.393a6 6 0 0 1 3.9-5.022"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
