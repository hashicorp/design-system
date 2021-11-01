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
                    fill="url(#amazon-eks-color-24__paint0_linear_879:136)"
                    d="M9.866 8.473h.924v2.725l2.661-2.725h1.22l-2.92 3.002 3.104 3.465h-1.182l-2.883-3.233v3.233h-.924V8.473z"
                />
                <path
                    fill="url(#amazon-eks-color-24__paint1_linear_879:136)"
                    d="M12.76 5.907l4.551 2.627a.252.252 0 01.126.217v5.254c0 .09.048.172.125.217l4.061 2.344A.251.251 0 0022 16.35V6.117a.251.251 0 00-.125-.217L13.012.784a.251.251 0 00-.377.217V5.69c0 .09.048.172.126.217z"
                />
                <path
                    fill="url(#amazon-eks-color-24__paint2_linear_879:136)"
                    d="M16.676 15.322l-4.55 2.626a.25.25 0 01-.252 0L6.69 14.955a.252.252 0 01-.126-.217V8.75c0-.09.048-.172.126-.217l4.55-2.627a.25.25 0 00.126-.217V1a.251.251 0 00-.377-.217L2.125 5.9A.251.251 0 002 6.117v11.255c0 .09.048.172.125.217l9.75 5.627a.25.25 0 00.25 0l8.863-5.115a.251.251 0 000-.435l-4.06-2.344a.25.25 0 00-.252 0z"
                />
                <defs>
                    <linearGradient
                        id="amazon-eks-color-24__paint0_linear_879:136"
                        x1={15.383}
                        x2={12.246}
                        y1={14.57}
                        y2={7.514}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#426DDB" />
                        <stop offset={1} stopColor="#3B4BDB" />
                    </linearGradient>
                    <linearGradient
                        id="amazon-eks-color-24__paint1_linear_879:136"
                        x1={22.99}
                        x2={13.995}
                        y1={15.694}
                        y2={0.202}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#426DDB" />
                        <stop offset={1} stopColor="#3B4BDB" />
                    </linearGradient>
                    <linearGradient
                        id="amazon-eks-color-24__paint2_linear_879:136"
                        x1={14.046}
                        x2={4.239}
                        y1={22.021}
                        y2={4.702}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#2775FF" />
                        <stop offset={1} stopColor="#188DFF" />
                    </linearGradient>
                </defs>
            </svg>
        );
    }
);
