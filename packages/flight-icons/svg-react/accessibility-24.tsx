import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAccessibility24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1m0 1.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19m2.934 7.069a.751.751 0 0 1 .63 1.361l-.008.004-.02.01-.075.033q-.1.045-.272.118c-.228.098-.544.227-.897.358a11 11 0 0 1-1.542.46v2.86l1.874 2.81a.75.75 0 1 1-1.248.833L12 16.352l-1.376 2.064a.75.75 0 0 1-1.248-.832l1.874-2.812v-2.858a11 11 0 0 1-1.542-.461 20 20 0 0 1-1.17-.476l-.074-.033-.021-.01-.006-.003a.75.75 0 1 1 .627-1.362l.004.002.017.007.065.03.25.108c.21.09.504.211.827.33.688.255 1.382.454 1.773.454.39 0 1.084-.2 1.772-.453a18 18 0 0 0 1.077-.439l.066-.03.016-.007zM12 5.999A1.75 1.75 0 1 1 12 9.5 1.75 1.75 0 0 1 12 6"
                />
            </svg>
        );
    }
);
