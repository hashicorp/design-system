import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconWatch24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.831 0a2.75 2.75 0 012.705 2.258l.667 3.665A7.982 7.982 0 0120 12a7.982 7.982 0 01-2.797 6.077l-.667 3.665A2.75 2.75 0 0113.831 24H10.17a2.75 2.75 0 01-2.705-2.258l-.667-3.665A7.982 7.982 0 014 12a7.982 7.982 0 012.797-6.077l.667-3.665A2.75 2.75 0 0110.169 0h3.662zm1.642 19.209A7.97 7.97 0 0112 20a7.97 7.97 0 01-3.473-.791l.412 2.265a1.25 1.25 0 001.23 1.026h3.662a1.25 1.25 0 001.23-1.026l.412-2.265zM12 5.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zm-.25 2a.75.75 0 01.75.75v3.786l2.085 1.043a.75.75 0 01-.67 1.342l-2.5-1.25A.75.75 0 0111 12.5V8.25a.75.75 0 01.75-.75zm-1.581-6a1.25 1.25 0 00-1.23 1.026l-.412 2.265A7.97 7.97 0 0112 4a7.97 7.97 0 013.473.791l-.413-2.265A1.25 1.25 0 0013.831 1.5H10.17z"
                />
            </svg>
        );
    }
);
