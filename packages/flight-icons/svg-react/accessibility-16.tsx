import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAccessibility16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 0a8 8 0 110 16A8 8 0 018 0zm0 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zm2.114 4.607a.75.75 0 11.773 1.286L10.5 6.75l.386.644h-.002l-.005.003-.017.01-.06.034a13.852 13.852 0 01-.915.484c-.274.133-.59.272-.9.379a5.004 5.004 0 01-.247.077c.006.039.01.078.01.119v1.723l1.32 1.539a.75.75 0 01-1.14.976L8 11.652l-.93 1.086a.75.75 0 01-1.14-.976l1.32-1.54V8.5c0-.04.004-.08.01-.12a5.004 5.004 0 01-.246-.076 8.511 8.511 0 01-.902-.378 13.858 13.858 0 01-.703-.364c-.089-.049-.16-.091-.212-.12l-.06-.035-.016-.01-.005-.002-.003-.002a.75.75 0 01.774-1.286l.002.001.011.007.05.03a12.306 12.306 0 00.812.43c.245.117.502.229.738.31.25.085.417.115.5.115.083 0 .25-.03.5-.115a7.04 7.04 0 00.738-.31 12.237 12.237 0 00.813-.43l.049-.03.011-.007h.003zM8 3.25a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
                />
            </svg>
        );
    }
);
