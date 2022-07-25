import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGcpColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#EA4335"
                    d="M15.084 8.501l2.516-2-.443-.551A7.913 7.913 0 009.71 4.326a7.853 7.853 0 00-5.304 5.446c-.04.15.416-.13.618-.075l3.476-.57s.17-.166.269-.273c1.546-1.689 4.168-1.91 5.954-.473l.362.12z"
                />
                <path
                    fill="#4285F4"
                    d="M19.516 9.733a7.78 7.78 0 00-2.361-3.784l-2.44 2.426a4.301 4.301 0 011.592 3.42v.43c1.2 0 2.172.967 2.172 2.16a2.165 2.165 0 01-2.172 2.158l-4.343-.003-.433.046v3.344l.433.07h4.343c2.49.02 4.7-1.585 5.438-3.95a5.599 5.599 0 00-2.23-6.317z"
                />
                <path
                    fill="#34A853"
                    d="M7.615 19.998h4.343V16.54H7.615c-.31 0-.615-.087-.897-.215l-.61.188-1.75 1.728-.153.597c.982.737 2.18 1.166 3.41 1.16z"
                />
                <path
                    fill="#FBBC05"
                    d="M7.615 8.763a5.646 5.646 0 00-5.32 3.823 5.608 5.608 0 001.91 6.251l2.52-2.512a2.156 2.156 0 01-1.256-2.272 2.165 2.165 0 011.843-1.833 2.174 2.174 0 012.285 1.249l2.52-2.505a5.654 5.654 0 00-4.502-2.201z"
                />
            </svg>
        );
    }
);
