import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPhone16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M4.39 0a2.206 2.206 0 012.204 1.896l.002.007c.084.642.242 1.273.468 1.88l.05.149a2.204 2.204 0 01-.547 2.177l-.512.512a10.91 10.91 0 003.312 3.306l.515-.514a2.212 2.212 0 012.327-.496 8.642 8.642 0 001.885.469h.007a2.206 2.206 0 011.898 2.238c-.008.317-.002 1.703 0 2.087v.075a2.204 2.204 0 01-1.5 2.098c-.291.098-.6.135-.906.107h-.014a15.203 15.203 0 01-6.618-2.351c-1.98-1.283-3.306-2.6-4.596-4.587A15.136 15.136 0 01.01 2.416l-.001-.012A2.209 2.209 0 012.206 0h2.185zM2.209 1.5a.72.72 0 00-.523.23.708.708 0 00-.182.534 13.635 13.635 0 002.12 5.972c1.174 1.809 2.349 2.977 4.153 4.145a13.701 13.701 0 005.957 2.117.715.715 0 00.707-.42c.04-.09.06-.188.06-.286l-.001-.071a150.02 150.02 0 010-2.134.706.706 0 00-.606-.715c-.754-.1-1.495-.284-2.208-.55h-.002a.715.715 0 00-.746.158l-.924.922a.751.751 0 01-.9.121 12.408 12.408 0 01-4.656-4.646.752.752 0 01.122-.902l.924-.922a.706.706 0 00.157-.742v-.002a10.088 10.088 0 01-.55-2.205A.708.708 0 004.4 1.5H2.208z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
