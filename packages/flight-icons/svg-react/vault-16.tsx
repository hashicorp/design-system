import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconVault16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M0 0l7.971 15.516L16 0H0zm6.732 6.16h-1.27V4.89h1.27v1.27zm0-1.906h-1.27V2.985h1.27v1.269zm1.904 3.81h-1.27v-1.27h1.27v1.27zm0-1.905h-1.27V4.89h1.27v1.27zm0-1.905h-1.27V2.985h1.27v1.269zm1.894 1.905H9.26V4.89h1.27v1.27zM9.26 4.254V2.985h1.27v1.269H9.26z"
                />
            </svg>
        );
    }
);
