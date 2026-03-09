import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCommand16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12.25 1a2.75 2.75 0 110 5.5H11v3h1.25a2.75 2.75 0 11-2.75 2.75V11h-3v1.25A2.75 2.75 0 113.75 9.5H5v-3H3.75A2.75 2.75 0 116.5 3.75V5h3V3.75A2.75 2.75 0 0112.25 1zm-8.5 10A1.25 1.25 0 105 12.25V11H3.75zM11 12.25A1.25 1.25 0 1012.25 11H11v1.25zM6.5 9.5h3v-3h-3v3zm-2.75-7a1.25 1.25 0 100 2.5H5V3.75c0-.69-.56-1.25-1.25-1.25zm8.5 0c-.69 0-1.25.56-1.25 1.25V5h1.25a1.25 1.25 0 100-2.5z"
                />
            </svg>
        );
    }
);
