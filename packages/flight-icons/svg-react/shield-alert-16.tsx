import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconShieldAlert16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M7.26.213a2.25 2.25 0 0 1 1.48 0l4.75 1.654A2.25 2.25 0 0 1 15 3.992V8c0 2.049-1.18 3.749-2.45 4.993-1.281 1.255-2.758 2.15-3.573 2.597a2.03 2.03 0 0 1-1.954 0c-.815-.447-2.292-1.342-3.573-2.597C2.18 11.749 1 10.049 1 8V3.992c0-.958.606-1.81 1.51-2.125zm.986 1.417a.75.75 0 0 0-.492 0l-4.75 1.654a.75.75 0 0 0-.504.708V8c0 1.456.847 2.791 2 3.921 1.141 1.119 2.483 1.937 3.244 2.354.163.089.35.089.512 0 .76-.417 2.103-1.235 3.244-2.354 1.153-1.13 2-2.465 2-3.92V3.99a.75.75 0 0 0-.504-.707zM8.006 10a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2zM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4"
                />
            </svg>
        );
    }
);
