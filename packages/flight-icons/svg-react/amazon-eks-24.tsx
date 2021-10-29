import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconAmazonEks24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
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
                <g fill={color}>
                    <path d="M12.126 17.948l4.55-2.626a.25.25 0 01.251 0l4.061 2.344a.251.251 0 010 .435l-8.862 5.115a.25.25 0 01-.252 0L2.125 17.59A.251.251 0 012 17.372V6.117c0-.09.048-.172.125-.217L10.988.784a.251.251 0 01.377.217V5.69a.25.25 0 01-.126.217L6.69 8.534a.252.252 0 00-.126.217v5.987c0 .09.048.172.126.217l5.185 2.993a.25.25 0 00.252 0z" />
                    <path d="M12.76 5.907l4.551 2.627a.252.252 0 01.126.217v5.254c0 .09.048.172.125.217l4.061 2.344A.251.251 0 0022 16.35V6.117a.251.251 0 00-.125-.217L13.012.784a.251.251 0 00-.377.217V5.69c0 .09.048.172.126.217z" />
                    <path d="M9.866 8.473h.924v2.725l2.661-2.725h1.22l-2.92 3.002 3.104 3.465h-1.182l-2.883-3.233v3.233h-.924V8.473z" />
                </g>
            </svg>
        );
    }
);
