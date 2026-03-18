import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAmazonEksColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="url(#amazon-eks-color-16__a)"
                    fillRule="evenodd"
                    d="M6.381 10.148h.897V8.121l1.837 2.027h1.164L7.997 7.642l2.169-2.195H8.963L7.278 7.147V5.447h-.897z"
                    clipRule="evenodd"
                />
                <path
                    fill="url(#amazon-eks-color-16__b)"
                    d="m8.532 3.803 3.186 1.81a.17.17 0 0 1 .088.149v3.62c0 .06.033.118.088.149l2.842 1.615a.176.176 0 0 0 .264-.15V3.947a.17.17 0 0 0-.088-.15L8.708.274a.176.176 0 0 0-.264.15v3.23c0 .062.034.119.088.15"
                />
                <path
                    fill="url(#amazon-eks-color-16__c)"
                    d="m11.273 10.288-3.185 1.81a.18.18 0 0 1-.176 0l-3.63-2.062a.17.17 0 0 1-.088-.15V5.762c0-.062.034-.119.088-.15l3.186-1.81a.17.17 0 0 0 .088-.15V.424a.176.176 0 0 0-.264-.15L1.088 3.798a.17.17 0 0 0-.088.15V11.7c0 .061.033.118.088.15l6.824 3.876c.054.03.122.03.176 0l6.204-3.524a.172.172 0 0 0 0-.3l-2.843-1.615a.18.18 0 0 0-.176 0"
                />
                <defs>
                    <linearGradient
                        id="amazon-eks-color-16__a"
                        x1={16.481}
                        x2={9.757}
                        y1={1.137}
                        y2={18.839}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#426ddb" />
                        <stop offset={1} stopColor="#3b4bdb" />
                    </linearGradient>
                    <linearGradient
                        id="amazon-eks-color-16__b"
                        x1={16.481}
                        x2={9.757}
                        y1={1.137}
                        y2={18.839}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#426ddb" />
                        <stop offset={1} stopColor="#3b4bdb" />
                    </linearGradient>
                    <linearGradient
                        id="amazon-eks-color-16__c"
                        x1={9.433}
                        x2={2.732}
                        y1={14.904}
                        y2={2.88}
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
