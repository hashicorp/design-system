import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconFrown24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zm0 1.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19zM12 13c1.5 0 2.73.746 3.543 1.424.413.344.738.687.96.944.127.145.25.294.361.451a.75.75 0 01-1.227.863l-.002-.002a4.906 4.906 0 00-.264-.33 6.932 6.932 0 00-.789-.774C13.895 15.004 12.999 14.5 12 14.5c-1 0-1.895.504-2.582 1.076a6.212 6.212 0 00-1.054 1.105.75.75 0 01-1.228-.86 5.68 5.68 0 01.36-.453c.223-.257.548-.6.961-.944C9.27 13.746 10.5 13 12 13zM9.01 8a1 1 0 010 2H9a1 1 0 110-2h.01zm6 0a1 1 0 110 2H15a1 1 0 110-2h.01z"
                />
            </svg>
        );
    }
);
