import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAnsibleAutomationPlatform16 = forwardRef<
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
                d="M8 .12c4.343 0 7.876 3.533 7.876 7.876S12.343 15.872 8 15.872.124 12.34.124 7.996C.124 3.654 3.657.12 8 .12m0 1.13a6.753 6.753 0 0 0-6.745 6.745A6.753 6.753 0 0 0 8 14.741a6.753 6.753 0 0 0 6.745-6.746A6.753 6.753 0 0 0 8 1.25m0 2.81a.56.56 0 0 1 .512.33l2.812 6.187a.562.562 0 0 1-.845.685L6.825 8.566 5.7 11.042a.56.56 0 0 1-.511.33l-.07-.004a.564.564 0 0 1-.442-.79L7.488 4.39A.56.56 0 0 1 8 4.06m-.7 3.46 2.104 1.552L8 5.982z"
            />
        </svg>
    );
});
