import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconOpenstackColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#DA1A32"
                    d="M4.162 10.54v.51c0 .398.315.72.703.72h6.27a.711.711 0 00.704-.72v-.51H15v3.131c0 .731-.585 1.329-1.3 1.329H2.3c-.715 0-1.3-.598-1.3-1.329v-3.132h3.162zm0-4.155v3.23H1v-3.23h3.161zm10.838 0v3.23h-3.161v-3.23H15zM13.7 1c.715 0 1.3.598 1.3 1.33v3.13h-3.161v-.51a.711.711 0 00-.704-.72h-6.27a.711.711 0 00-.704.72v.51H1V2.33C1 1.598 1.585 1 2.3 1h11.4z"
                />
            </svg>
        );
    }
);
