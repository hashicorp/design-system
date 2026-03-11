import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMoon24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M11.098 2.004a.753.753 0 01.722.378.753.753 0 01-.05.814 6.463 6.463 0 00.627 8.408 6.463 6.463 0 008.407.626.753.753 0 01.814-.05.753.753 0 01.38.723 10.026 10.026 0 01-6.574 8.501 10.024 10.024 0 01-10.49-2.339 10.022 10.022 0 01.957-15.011 10.025 10.025 0 015.207-2.05zM9.7 3.784a8.53 8.53 0 00-5.693 5.303 8.523 8.523 0 001.988 8.918 8.523 8.523 0 0012.765-.813 8.531 8.531 0 001.458-2.891A7.962 7.962 0 019.7 3.783z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
