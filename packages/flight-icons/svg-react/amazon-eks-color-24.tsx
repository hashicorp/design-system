import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAmazonEksColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="url(#amazon-eks-color-24__a)"
                    d="M9.866 8.473h.924v2.725l2.661-2.725h1.22l-2.92 3.002 3.104 3.465h-1.182l-2.883-3.233v3.233h-.924z"
                />
                <path
                    fill="url(#amazon-eks-color-24__b)"
                    d="m12.76 5.907 4.551 2.627a.25.25 0 0 1 .126.217v5.254c0 .09.048.172.125.217l4.061 2.344A.251.251 0 0 0 22 16.35V6.117a.25.25 0 0 0-.125-.217L13.012.784a.251.251 0 0 0-.377.217V5.69c0 .09.048.172.126.217"
                />
                <path
                    fill="url(#amazon-eks-color-24__c)"
                    d="m16.676 15.322-4.55 2.626a.25.25 0 0 1-.252 0L6.69 14.955a.25.25 0 0 1-.126-.217V8.75c0-.09.048-.172.126-.217l4.55-2.627a.25.25 0 0 0 .126-.217V1a.251.251 0 0 0-.377-.217L2.125 5.9A.25.25 0 0 0 2 6.117v11.255c0 .09.048.172.125.217l9.75 5.627a.25.25 0 0 0 .25 0l8.863-5.115a.251.251 0 0 0 0-.435l-4.06-2.344a.25.25 0 0 0-.252 0"
                />
                <defs>
                    <linearGradient
                        id="amazon-eks-color-24__a"
                        x1={24.115}
                        x2={14.237}
                        y1={2.037}
                        y2={27.63}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#426ddb" />
                        <stop offset={1} stopColor="#3b4bdb" />
                    </linearGradient>
                    <linearGradient
                        id="amazon-eks-color-24__b"
                        x1={24.115}
                        x2={14.237}
                        y1={2.037}
                        y2={27.63}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#426ddb" />
                        <stop offset={1} stopColor="#3b4bdb" />
                    </linearGradient>
                    <linearGradient
                        id="amazon-eks-color-24__c"
                        x1={14.046}
                        x2={4.239}
                        y1={22.021}
                        y2={4.702}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#2775ff" />
                        <stop offset={1} stopColor="#188dff" />
                    </linearGradient>
                </defs>
            </svg>
        );
    }
);
