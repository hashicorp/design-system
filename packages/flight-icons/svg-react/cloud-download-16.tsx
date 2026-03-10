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
                    d="M8 7.25a.754.754 0 01.75.75v4.44l1.469-1.47a.754.754 0 011.06 0c.291.292.29.768 0 1.06l-2.75 2.75A.762.762 0 018 15a.76.76 0 01-.53-.22l-2.75-2.75a.753.753 0 010-1.06.754.754 0 011.06 0l1.47 1.47V8A.753.753 0 018 7.25zM3.93 1.372a6.044 6.044 0 016.24 1.28 6.015 6.015 0 011.504 2.285h.28A4.035 4.035 0 0116 8.968a4.036 4.036 0 01-1.852 3.387.753.753 0 01-1.036-.224.754.754 0 01.224-1.037A2.536 2.536 0 0014.5 8.969a2.535 2.535 0 00-2.545-2.532h-.83a.755.755 0 01-.725-.562 4.512 4.512 0 00-3.466-3.283 4.536 4.536 0 00-4.488 1.654 4.505 4.505 0 00-.922 2.3 4.495 4.495 0 001.308 3.642c.292.291.294.767.005 1.061a.755.755 0 01-1.061.005A5.995 5.995 0 01.03 6.394a6.002 6.002 0 013.9-5.022z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
