import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAnsibleAutomationPlatform24 = forwardRef<
    SVGSVGElement,
    IconProps
>(({ color = 'currentColor', title, ...props }, svgRef) => {
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
                d="M12 1.492c5.79 0 10.502 4.712 10.502 10.503 0 5.79-4.711 10.501-10.502 10.501-5.79 0-10.5-4.711-10.501-10.5 0-5.79 4.71-10.504 10.501-10.504zM12 3c-4.959 0-8.994 4.034-8.994 8.994S7.04 20.988 12 20.988s8.994-4.034 8.994-8.994S16.96 3 12 3zm0 3.747a.751.751 0 01.683.439l3.75 8.25a.752.752 0 01-1.128.914l-4.871-3.595-1.501 3.3a.752.752 0 01-1.042.35.753.753 0 01-.324-.97l3.75-8.25A.75.75 0 0112 6.748zm-.933 4.612l2.806 2.07L12 9.31l-.933 2.05z"
            />
        </svg>
    );
});
