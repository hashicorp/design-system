import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCompass16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 0a8 8 0 110 16A8 8 0 018 0zm0 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zm3.028 2.586a.7.7 0 01.886.886L10.29 9.847a.7.7 0 01-.442.442l-4.875 1.625a.7.7 0 01-.886-.886L5.71 6.153a.7.7 0 01.442-.442l4.875-1.625zm-4.1 2.843l-1.072 3.215L9.071 9.07l1.073-3.215L6.929 6.93z"
                />
            </svg>
        );
    }
);
