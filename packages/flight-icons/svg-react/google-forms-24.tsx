import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGoogleForms24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M6.11 22h11.78c.748 0 1.36-.614 1.36-1.364V7l-4.984-5H6.109c-.747 0-1.359.614-1.359 1.364v17.272c0 .75.612 1.364 1.36 1.364zm2.945-11.704a.624.624 0 11-1.248.001.624.624 0 011.248-.002zm7.023.568h-5.89V9.727h5.89v1.137zm0 1.59h-5.89v1.137h5.89v-1.136zm0 2.728h-5.89v1.136h5.89v-1.136zm-7.646-1.534A.624.624 0 108.43 12.4a.624.624 0 00.002 1.248zm.623 2.102a.624.624 0 11-1.248.002.624.624 0 011.248-.002z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
