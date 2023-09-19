import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGoogleDocs24 = forwardRef<SVGSVGElement, IconProps>(
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
                <path fill="#0C67D6" d="M14.266 2l4.984 5h-4.984V2z" />
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M6.11 22h11.78c.748 0 1.36-.614 1.36-1.364V7l-4.984-5H6.109c-.747 0-1.359.614-1.359 1.364v17.272c0 .75.612 1.364 1.36 1.364zm1.812-11.136h8.156V9.727H7.922v1.137zm0 1.59h8.156v1.137H7.922v-1.136zm0 2.728h5.89v1.136h-5.89v-1.136z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
