import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconIncompleteNormal24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 1.25a.75.75 0 0 1 .75.75v20a.75.75 0 0 1-.75.75C6.063 22.75 1.25 17.937 1.25 12S6.063 1.25 12 1.25m3.269 19.523a.75.75 0 0 1 .479 1.421q-.271.092-.552.17a.75.75 0 0 1-.4-1.447q.24-.066.473-.145m3.31-2.051a.75.75 0 1 1 1.059 1.06q-.409.408-.862.768a.75.75 0 1 1-.931-1.175q.386-.306.733-.653m2.086-3.31a.75.75 0 1 1 1.41.51q-.196.544-.446 1.056a.75.75 0 1 1-1.349-.656q.215-.44.385-.91m1.287-4.695a.75.75 0 0 1 .785.714 12 12 0 0 1 0 1.14.75.75 0 0 1-1.499-.072 11 11 0 0 0 0-.998.75.75 0 0 1 .714-.784m-1.325-4.042a.75.75 0 0 1 1.002.346q.25.514.446 1.057a.75.75 0 0 1-1.41.51 9 9 0 0 0-.385-.91.75.75 0 0 1 .347-1.003m-2.904-3.103a.75.75 0 0 1 1.053-.122q.454.36.862.768a.75.75 0 0 1-1.06 1.06 9 9 0 0 0-.733-.652.75.75 0 0 1-.122-1.054M14.274 2.16a.75.75 0 0 1 .923-.522q.28.077.551.169a.75.75 0 0 1-.48 1.42 9 9 0 0 0-.471-.144.75.75 0 0 1-.523-.923"
                />
            </svg>
        );
    }
);
