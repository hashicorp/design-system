import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconVaultColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#FFD814"
                    d="M1 1l10.96 21.334L23 1H1zm9.256 8.469H8.51V7.723h1.746v1.746zm0-2.62H8.51V5.105h1.746v1.744zm2.618 5.238h-1.746v-1.746h1.746v1.746zm0-2.618h-1.746V7.723h1.746v1.746zm0-2.62h-1.746V5.105h1.746v1.744zm2.604 2.62h-1.746V7.723h1.746v1.746zm-1.746-2.62V5.105h1.746v1.744h-1.746z"
                />
            </svg>
        );
    }
);
