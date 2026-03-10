import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconZap24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12.452 1.269a.752.752 0 01.881-.205c.306.137.484.461.437.792l-.918 6.409 8.48.94a.751.751 0 01.493 1.227L11.548 22.729a.751.751 0 01-1.319-.586l.919-6.409-8.481-.94a.752.752 0 01-.493-1.227l10.278-12.3zm-8.23 12.189l7.86.871a.753.753 0 01.66.852l-.653 4.563 7.69-9.203-7.862-.871a.752.752 0 01-.66-.852l.654-4.562-7.69 9.202z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
