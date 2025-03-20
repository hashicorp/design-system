import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAzureAksColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="url(#azure-aks-color-16__paint0_linear_2372_185)"
                    d="M5.511 2l-2.224.412v3.034l2.224.474 2.232-.894V2.762L5.511 2z"
                />
                <path
                    fill="#341A6E"
                    d="M3.287 2.412v3.034l2.247.474V2.031l-2.247.381zm.949 2.8l-.63-.124V2.754l.63-.1v2.558zm.98.18l-.724-.118V2.607l.724-.125v2.91z"
                />
                <path
                    fill="url(#azure-aks-color-16__paint1_linear_2372_185)"
                    d="M10.325 2.039l-2.224.412v3.033l2.224.475 2.225-.902V2.8l-2.225-.762z"
                />
                <path
                    fill="#341A6E"
                    d="M8.101 2.451v3.033l2.232.475V2.07l-2.232.381zm.941 2.8l-.63-.124V2.793l.63-.1V5.25zm.98.179L9.3 5.313V2.646l.723-.133V5.43z"
                />
                <path
                    fill="url(#azure-aks-color-16__paint2_linear_2372_185)"
                    d="M3.232 6.184l-2.224.413V9.63l2.224.474 2.232-.894V6.947l-2.232-.763z"
                />
                <path
                    fill="#341A6E"
                    d="M1 6.597v3.01l2.248.474V6.192L1 6.597zm.941 2.807l-.63-.132V6.94l.63-.109v2.574zm.988.203l-.723-.117V6.791l.723-.124v2.94z"
                />
                <path
                    fill="url(#azure-aks-color-16__paint3_linear_2372_185)"
                    d="M8.031 6.153l-2.224.413v3.033l2.224.482 2.224-.902V6.916l-2.224-.763z"
                />
                <path
                    fill="#341A6E"
                    d="M5.807 6.566v3.04l2.24.475V6.192l-2.24.374zm.94 2.807l-.63-.132V6.908l.63-.11v2.575zm.98.171l-.723-.116V6.76l.724-.124v2.908z"
                />
                <path
                    fill="url(#azure-aks-color-16__paint4_linear_2372_185)"
                    d="M12.83 6.192l-2.225.412v3.034l2.225.474 2.232-.894V6.954l-2.232-.762z"
                />
                <path
                    fill="#341A6E"
                    d="M10.605 6.604v3.003l2.248.474V6.192l-2.248.412zm.95 2.808l-.63-.132V6.947l.63-.11v2.575zm.98.171l-.724-.116V6.799l.723-.125v2.91z"
                />
                <path
                    fill="url(#azure-aks-color-16__paint5_linear_2372_185)"
                    d="M5.457 10.416l-2.225.404v3.033l2.225.483 2.232-.903v-2.255l-2.232-.762z"
                />
                <path
                    fill="#341A6E"
                    d="M3.232 10.82v3.033l2.248.483v-3.952l-2.248.436zm.95 2.808l-.63-.132v-2.334l.63-.109v2.575zm.98.179l-.724-.117v-2.675l.723-.125v2.917z"
                />
                <path
                    fill="url(#azure-aks-color-16__paint6_linear_2372_185)"
                    d="M10.263 10.447l-2.224.412v3.033l2.224.475 2.232-.895V11.21l-2.232-.762z"
                />
                <path
                    fill="#341A6E"
                    d="M8.039 10.859v3.033l2.248.475v-3.89l-2.248.382zm.949 2.808l-.63-.133v-2.333l.63-.109v2.575zm.98.17l-.724-.116v-2.668l.724-.124v2.909z"
                />
                <defs>
                    <linearGradient
                        id="azure-aks-color-16__paint0_linear_2372_185"
                        x1={1}
                        x2={15.062}
                        y1={8.183}
                        y2={8.183}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#B77AF4" />
                        <stop offset={1} stopColor="#773ADC" />
                    </linearGradient>
                    <linearGradient
                        id="azure-aks-color-16__paint1_linear_2372_185"
                        x1={1}
                        x2={15.062}
                        y1={8.183}
                        y2={8.183}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#B77AF4" />
                        <stop offset={1} stopColor="#773ADC" />
                    </linearGradient>
                    <linearGradient
                        id="azure-aks-color-16__paint2_linear_2372_185"
                        x1={1}
                        x2={15.038}
                        y1={8.183}
                        y2={8.183}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#B77AF4" />
                        <stop offset={1} stopColor="#773ADC" />
                    </linearGradient>
                    <linearGradient
                        id="azure-aks-color-16__paint3_linear_2372_185"
                        x1={1}
                        x2={15.062}
                        y1={8.171}
                        y2={8.171}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#B77AF4" />
                        <stop offset={1} stopColor="#773ADC" />
                    </linearGradient>
                    <linearGradient
                        id="azure-aks-color-16__paint4_linear_2372_185"
                        x1={1}
                        x2={15.062}
                        y1={8.183}
                        y2={8.183}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#B77AF4" />
                        <stop offset={1} stopColor="#773ADC" />
                    </linearGradient>
                    <linearGradient
                        id="azure-aks-color-16__paint5_linear_2372_185"
                        x1={1}
                        x2={15.062}
                        y1={8.183}
                        y2={8.183}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#B77AF4" />
                        <stop offset={1} stopColor="#773ADC" />
                    </linearGradient>
                    <linearGradient
                        id="azure-aks-color-16__paint6_linear_2372_185"
                        x1={1}
                        x2={15.062}
                        y1={8.183}
                        y2={8.183}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#B77AF4" />
                        <stop offset={1} stopColor="#773ADC" />
                    </linearGradient>
                </defs>
            </svg>
        );
    }
);
