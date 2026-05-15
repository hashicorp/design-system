import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconShield16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M7.26.212a2.25 2.25 0 0 1 1.48 0l4.75 1.654A2.25 2.25 0 0 1 15 3.99V8c0 2.048-1.181 3.748-2.45 4.992-1.281 1.255-2.758 2.15-3.573 2.597a2.03 2.03 0 0 1-1.954 0c-.815-.447-2.292-1.342-3.573-2.597C2.181 11.748 1 10.048 1 8V3.99c0-.957.607-1.81 1.51-2.124zm.986 1.417a.75.75 0 0 0-.492 0l-4.75 1.654a.75.75 0 0 0-.504.708V8c0 1.455.847 2.79 2 3.92 1.141 1.119 2.483 1.937 3.244 2.354.162.089.35.089.512 0 .76-.417 2.103-1.235 3.244-2.353 1.153-1.13 2-2.466 2-3.921V3.99a.75.75 0 0 0-.504-.707z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
