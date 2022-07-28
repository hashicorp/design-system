import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAzureVmsColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="url(#azure-vms-color-16__paint0_linear_2372_267)"
                    d="M14.533 2H1.467A.467.467 0 001 2.467v8.4c0 .257.209.466.467.466h13.066a.467.467 0 00.467-.466v-8.4A.467.467 0 0014.533 2z"
                />
                <path
                    fill="#50E6FF"
                    d="M10.333 5.306V8.02L8 9.389V6.667l2.333-1.361z"
                />
                <path
                    fill="#C3F1FF"
                    d="M10.333 5.306L8 6.674 5.667 5.306 8 3.944l2.333 1.362z"
                />
                <path
                    fill="#9CEBFF"
                    d="M8 6.674V9.39L5.667 8.02V5.306L8 6.674z"
                />
                <path
                    fill="#C3F1FF"
                    d="M5.667 8.02L8 6.667v2.722L5.667 8.02z"
                />
                <path
                    fill="#9CEBFF"
                    d="M10.333 8.02L8 6.667v2.722l2.333-1.369z"
                />
                <path
                    fill="url(#azure-vms-color-16__paint1_linear_2372_267)"
                    d="M10.808 14.157c-1.385-.218-1.44-1.214-1.44-2.824H6.624c0 1.61-.046 2.606-1.43 2.824a.778.778 0 00-.693.777h7a.777.777 0 00-.692-.777z"
                />
                <defs>
                    <linearGradient
                        id="azure-vms-color-16__paint0_linear_2372_267"
                        x1={8}
                        x2={8}
                        y1={11.333}
                        y2={2}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#0078D4" />
                        <stop offset={0.82} stopColor="#5EA0EF" />
                    </linearGradient>
                    <linearGradient
                        id="azure-vms-color-16__paint1_linear_2372_267"
                        x1={8}
                        x2={8}
                        y1={14.934}
                        y2={11.333}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset={0.15} stopColor="#CCC" />
                        <stop offset={1} stopColor="#707070" />
                    </linearGradient>
                </defs>
            </svg>
        );
    }
);
