import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCloud16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M3.932 2.373a6.036 6.036 0 016.238 1.28 6.006 6.006 0 011.505 2.285h.28c1.071 0 2.1.424 2.859 1.18a4.029 4.029 0 011.185 2.85c0 1.07-.427 2.097-1.185 2.852A4.057 4.057 0 0111.956 14h-5.93a6.016 6.016 0 01-5.41-3.354 5.987 5.987 0 01.644-6.32 6.027 6.027 0 012.663-1.95l.01-.003zm3.001 1.22a4.55 4.55 0 00-2.476.184l-.006.003a4.527 4.527 0 00-2.006 1.467A4.487 4.487 0 003.63 11.82c.715.444 1.543.68 2.386.681h5.939c.674 0 1.323-.268 1.8-.742a2.53 2.53 0 00.743-1.79 2.53 2.53 0 00-.744-1.788 2.557 2.557 0 00-1.8-.742h-.83a.753.753 0 01-.726-.562 4.503 4.503 0 00-3.466-3.283z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
