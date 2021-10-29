import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPenTool24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M1.923 1.02a.75.75 0 00-.903.903l3.5 14.75a.75.75 0 00.588.563l6.51 1.26-.148.149a.75.75 0 000 1.06l3.075 3.075a.75.75 0 001.06 0l7.175-7.175a.75.75 0 000-1.06l-3.075-3.075a.75.75 0 00-1.06 0l-.149.148-1.26-6.51a.75.75 0 00-.563-.588l-14.75-3.5zm15.293 11.878l-1.36-7.03L4.15 3.091l5.325 5.324a3 3 0 11-1.06 1.06L3.09 4.152l2.777 11.705 7.03 1.36 4.318-4.318zm-4.155 6.277l6.114-6.114 2.014 2.014-6.114 6.114-2.014-2.014zM9.5 11a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
