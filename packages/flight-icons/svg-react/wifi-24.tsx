import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconWifi24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12.01 19a1 1 0 0 1 0 2H12a1 1 0 1 1 0-2zm-.005-5c1.4 0 2.767.436 3.91 1.247a.75.75 0 0 1-.87 1.223 5.25 5.25 0 0 0-6.081 0 .75.75 0 1 1-.868-1.223A6.75 6.75 0 0 1 12.005 14m.035-5c2.748 0 5.408.963 7.52 2.722a.75.75 0 1 1-.96 1.152 10.25 10.25 0 0 0-13.12 0 .75.75 0 1 1-.96-1.152A11.75 11.75 0 0 1 12.04 9M12 4a16.75 16.75 0 0 1 11.076 4.185.75.75 0 0 1-.992 1.125 15.25 15.25 0 0 0-20.168 0 .75.75 0 0 1-.992-1.125A16.75 16.75 0 0 1 12 4"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
