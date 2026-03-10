import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconStep24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M9.75 3.25a.75.75 0 01.75.75v5.25h.25A2.25 2.25 0 0113 11.5v2a2.25 2.25 0 01-2.25 2.25h-.25V16c0 .866.338 1.694.935 2.303a3.144 3.144 0 002.244.947h5.071a.75.75 0 010 1.5h-5.071a4.645 4.645 0 01-3.314-1.396A4.787 4.787 0 019 16v-.25h-.25A2.25 2.25 0 016.5 13.5v-2a2.25 2.25 0 012.25-2.25H9V4a.75.75 0 01.75-.75zm-1 7.5a.75.75 0 00-.75.75v2c0 .414.336.75.75.75h2a.75.75 0 00.75-.75v-2a.75.75 0 00-.75-.75h-2z"
                />
            </svg>
        );
    }
);
