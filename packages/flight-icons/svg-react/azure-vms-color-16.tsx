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
                    fill="url(#azure-vms-color-16__a)"
                    d="M14.533 2H1.467A.467.467 0 0 0 1 2.467v8.4c0 .257.209.466.467.466h13.066a.467.467 0 0 0 .467-.466v-8.4A.467.467 0 0 0 14.533 2"
                />
                <path fill="#50e6ff" d="M10.333 5.306V8.02L8 9.389V6.667z" />
                <path
                    fill="#c3f1ff"
                    d="M10.333 5.306 8 6.674 5.667 5.306 8 3.944z"
                />
                <path fill="#9cebff" d="M8 6.674V9.39L5.667 8.02V5.306z" />
                <path fill="#c3f1ff" d="M5.667 8.02 8 6.667v2.722z" />
                <path fill="#9cebff" d="M10.333 8.02 8 6.667v2.722z" />
                <path
                    fill="url(#azure-vms-color-16__b)"
                    d="M10.808 14.157c-1.385-.218-1.44-1.214-1.44-2.824H6.624c0 1.61-.046 2.606-1.43 2.824a.78.78 0 0 0-.693.777h7a.78.78 0 0 0-.692-.777"
                />
                <defs>
                    <linearGradient
                        id="azure-vms-color-16__a"
                        x1={8}
                        x2={8}
                        y1={14.934}
                        y2={2}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#0078d4" />
                        <stop offset={0.82} stopColor="#5ea0ef" />
                    </linearGradient>
                    <linearGradient
                        id="azure-vms-color-16__b"
                        x1={8}
                        x2={8}
                        y1={14.934}
                        y2={11.333}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset={0.15} stopColor="#ccc" />
                        <stop offset={1} stopColor="#707070" />
                    </linearGradient>
                </defs>
            </svg>
        );
    }
);
