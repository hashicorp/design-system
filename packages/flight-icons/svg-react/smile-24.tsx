import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSmile24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zm0 1.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19zm3.514 10.778a.876.876 0 011.474.943l-.1.144a7.658 7.658 0 01-1.2 1.3c-.818.701-2.075 1.46-3.688 1.46s-2.871-.759-3.69-1.46a7.644 7.644 0 01-.948-.972 5.123 5.123 0 01-.35-.472.876.876 0 011.474-.944c.072.108.151.21.233.31.166.204.412.477.728.748.642.549 1.51 1.04 2.553 1.04s1.91-.491 2.552-1.04c.317-.271.563-.544.73-.747.08-.1.16-.202.232-.31zM9.01 8a1 1 0 010 2H9a1 1 0 110-2h.01zm6 0a1 1 0 110 2H15a1 1 0 110-2h.01z"
                />
            </svg>
        );
    }
);
