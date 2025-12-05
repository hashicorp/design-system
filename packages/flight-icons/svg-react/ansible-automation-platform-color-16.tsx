import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAnsibleAutomationPlatformColor16 = forwardRef<
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
                fill="#E00"
                d="M8 15.872c-4.343 0-7.876-3.533-7.876-7.876C.124 3.654 3.657.12 8 .12s7.876 3.534 7.876 7.877S12.343 15.872 8 15.872zM8 1.25a6.753 6.753 0 00-6.746 6.746A6.753 6.753 0 008 14.74a6.753 6.753 0 006.745-6.745A6.753 6.753 0 008 1.25z"
            />
            <path
                fill="#001D6C"
                d="M5.187 11.372a.562.562 0 01-.511-.795l2.812-6.188a.562.562 0 011.024 0l2.812 6.188a.563.563 0 01-.846.685L6.825 8.566l-1.126 2.476a.561.561 0 01-.512.33zM7.3 7.52l2.103 1.552L8 5.982 7.3 7.52z"
            />
        </svg>
    );
});
