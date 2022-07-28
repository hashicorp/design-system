import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconInfracostColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="url(#infracost-color-16__paint0_linear_2372_396)"
                    d="M12.2 1H3.8A2.8 2.8 0 001 3.8v8.4A2.8 2.8 0 003.8 15h8.4a2.8 2.8 0 002.8-2.8V3.8A2.8 2.8 0 0012.2 1z"
                />
                <path
                    fill="#fff"
                    d="M9.05 4.85l-2.1 2.1h1.06c.714 0 1.04.672 1.04 1.05v3.15h2.09c0-.78.01-2.713.01-4.2 0-1.292-1.092-2.1-2.1-2.1z"
                />
                <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M4.85 5.018c0-.093.075-.168.168-.168h.21c.093 0 .168.075.168.168v1.764a.168.168 0 01-.168.168h-.21a.168.168 0 01-.168-.168V5.018zm.945-.168a.168.168 0 00-.168.168v1.764c0 .093.075.168.168.168h.21a.168.168 0 00.168-.168V5.018a.168.168 0 00-.168-.168h-.21zm.777 0a.168.168 0 00-.168.168v1.764c0 .093.075.168.168.168h.378V5.018a.168.168 0 00-.168-.168h-.21zM4.95 8.952a.336.336 0 00-.099.237v1.793c0 .093.075.168.168.168h.21a.168.168 0 00.168-.168V8.605a.042.042 0 00-.072-.03l-.375.377zm.678-.54c0-.089.035-.174.098-.237l.376-.376a.042.042 0 01.072.03v3.153a.168.168 0 01-.168.168h-.21a.168.168 0 01-.168-.168v-2.57zm.876-1.014a.336.336 0 00-.099.237v3.347c0 .093.075.168.168.168h.21a.168.168 0 00.168-.168V6.95l-.447.448z"
                    clipRule="evenodd"
                />
                <defs>
                    <linearGradient
                        id="infracost-color-16__paint0_linear_2372_396"
                        x1={15}
                        x2={-1.821}
                        y1={1}
                        y2={9.242}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#E7B28C" />
                        <stop offset={0.497} stopColor="#BD62B6" />
                        <stop offset={1} stopColor="#6658C5" />
                    </linearGradient>
                </defs>
            </svg>
        );
    }
);
