import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAzureVmsColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="url(#azure-vms-color-24__a)"
                    d="M21.333 3H2.667A.667.667 0 0 0 2 3.667v12c0 .368.298.666.667.666h18.666a.667.667 0 0 0 .667-.666v-12A.667.667 0 0 0 21.333 3"
                />
                <path fill="#50e6ff" d="M15.333 7.722V11.6L12 13.556v-3.89z" />
                <path
                    fill="#c3f1ff"
                    d="M15.333 7.722 12 9.678 8.667 7.722 12 5.778z"
                />
                <path fill="#9cebff" d="M12 9.678v3.878L8.667 11.6V7.722z" />
                <path fill="#c3f1ff" d="M8.667 11.6 12 9.667v3.889z" />
                <path fill="#9cebff" d="M15.333 11.6 12 9.667v3.889z" />
                <path
                    fill="url(#azure-vms-color-24__b)"
                    d="M16.011 20.367c-1.978-.312-2.055-1.734-2.055-4.034h-3.923c0 2.3-.066 3.723-2.044 4.034A1.11 1.11 0 0 0 7 21.477h10a1.11 1.11 0 0 0-.989-1.11"
                />
                <defs>
                    <linearGradient
                        id="azure-vms-color-24__a"
                        x1={12}
                        x2={12}
                        y1={21.478}
                        y2={3}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#0078d4" />
                        <stop offset={0.82} stopColor="#5ea0ef" />
                    </linearGradient>
                    <linearGradient
                        id="azure-vms-color-24__b"
                        x1={12}
                        x2={12}
                        y1={21.478}
                        y2={16.333}
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
