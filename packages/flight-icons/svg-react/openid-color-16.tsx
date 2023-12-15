import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconOpenidColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fillRule="evenodd" clipRule="evenodd">
                    <path
                        fill="#F8941C"
                        d="M7.438 3.71v10.014l1.797-.838V2.84l-1.797.87z"
                    />
                    <path
                        fill="#BCBEC0"
                        d="M3.845 9.913c0-1.262 1.387-2.324 3.278-2.649v-1.13C4.23 6.48 2.048 8.04 2.048 9.913c0 1.94 2.343 3.544 5.39 3.811v-1.116c-2.05-.255-3.593-1.365-3.593-2.695zM9.55 6.134v1.13c.752.13 1.425.375 1.963.704l1.27-.778c-.866-.53-1.983-.906-3.233-1.056z"
                    />
                    <path
                        fill="#BCBEC0"
                        d="M13.662 6.647L13.91 9.2l-3.475-.75"
                    />
                </g>
            </svg>
        );
    }
);
