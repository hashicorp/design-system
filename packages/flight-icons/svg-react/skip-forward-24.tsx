import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSkipForward24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M4 5.938c0-1.422 1.606-2.25 2.765-1.426l8.524 6.061c.98.698.98 2.155 0 2.853l-8.524 6.061C5.606 20.31 4 19.482 4 18.062zM18.75 4.25a.75.75 0 0 1 .75.75v14a.75.75 0 0 1-.75.75A.75.75 0 0 1 18 19V5a.75.75 0 0 1 .75-.75M5.895 5.734a.25.25 0 0 0-.395.204v12.124c.001.201.23.32.395.204l8.524-6.063a.25.25 0 0 0 0-.407z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
