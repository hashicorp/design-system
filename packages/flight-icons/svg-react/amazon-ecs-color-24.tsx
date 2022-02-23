import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAmazonEcsColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fillRule="evenodd" clipRule="evenodd">
                    <path
                        fill="url(#amazon-ecs-color-24__paint0_linear_1587_73)"
                        d="M11.89 21.634l-8.571-4.317v-9.66L9.859 3.8v2.867l-3.596 2.25a.653.653 0 00-.306.552v5.993a.65.65 0 00.366.584l5.2 2.547a.667.667 0 00.592-.003l4.082-2.054 2.742 2.284-7.05 2.814zm4.821-6.373a.67.67 0 00-.724-.082l-4.176 2.1-4.535-2.221V9.826l3.594-2.25a.65.65 0 00.307-.552V2.653a.66.66 0 00-.997-.56L2.322 6.726a.65.65 0 00-.322.56v10.43c0 .245.138.47.36.58l9.198 4.634a.66.66 0 00.546.023l8.345-3.328a.65.65 0 00.178-1.104l-3.916-3.26z"
                    />
                    <path
                        fill="url(#amazon-ecs-color-24__paint1_linear_1587_73)"
                        d="M20.38 15.179l-2.57-1.996V9.47a.65.65 0 00-.311-.554l-3.68-2.255V3.796l6.562 3.84v7.543zm.996-8.474l-7.88-4.614a.67.67 0 00-.664-.006.652.652 0 00-.332.566v4.373c0 .225.119.435.311.554l3.68 2.254V13.5c0 .2.094.39.253.513l3.889 3.022a.659.659 0 00.695.073.65.65 0 00.372-.585V7.265a.648.648 0 00-.324-.56z"
                    />
                </g>
                <defs>
                    <linearGradient
                        id="amazon-ecs-color-24__paint0_linear_1587_73"
                        x1={13.489}
                        x2={2.176}
                        y1={7}
                        y2={12.37}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset={0.261} stopColor="#F7981D" />
                        <stop offset={0.697} stopColor="#F37731" />
                        <stop offset={1} stopColor="#F1623E" />
                    </linearGradient>
                    <linearGradient
                        id="amazon-ecs-color-24__paint1_linear_1587_73"
                        x1={13.489}
                        x2={2.176}
                        y1={7}
                        y2={12.37}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset={0.261} stopColor="#F7981D" />
                        <stop offset={0.697} stopColor="#F37731" />
                        <stop offset={1} stopColor="#F1623E" />
                    </linearGradient>
                </defs>
            </svg>
        );
    }
);
