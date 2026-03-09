import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconStarFill24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M11.99 1c.285 0 .546.162.673.418l2.993 6.064 6.692.979c.282.042.518.24.606.51a.752.752 0 01-.19.77l-4.843 4.717 1.143 6.665a.751.751 0 01-1.089.791l-5.985-3.148-5.986 3.148a.75.75 0 01-1.087-.791l1.142-6.665L1.216 9.74a.75.75 0 01.415-1.28l6.694-.978 2.993-6.064A.75.75 0 0111.99 1z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
