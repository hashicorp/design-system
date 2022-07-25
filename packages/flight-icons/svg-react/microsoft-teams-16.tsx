import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMicrosoftTeams16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M10.768 4.112A2.114 2.114 0 018.65 6.226a2.114 2.114 0 01-2.116-2.112C6.535 2.946 7.482 2 8.65 2s2.117.946 2.117 2.112zM13.21 6.225c.808 0 1.464-.655 1.464-1.462 0-.808-.655-1.463-1.465-1.463a1.464 1.464 0 100 2.925zM14.381 6.875c.342 0 .619.276.619.617v3.288a2.272 2.272 0 01-2.274 2.27h-.01c-.346 0-.673-.077-.966-.214A3.673 3.673 0 018.488 15a3.669 3.669 0 01-3.581-3.75h1.475V6.875h8z" />
                    <path
                        fillRule="evenodd"
                        d="M7.566 4.925h-5.97A.596.596 0 001 5.521v5.958c0 .33.267.596.597.596h5.969c.33 0 .597-.267.597-.596V5.521a.596.596 0 00-.597-.596zM4.959 7.193h1.193v-.63H3.011v.63h1.188v3.243h.76V7.193z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
