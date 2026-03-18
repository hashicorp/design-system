import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAmazonEcsColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fillRule="evenodd" clipRule="evenodd">
                    <path
                        fill="url(#amazon-ecs-color-16__a)"
                        d="m8.03 14.95-6.526-3.287V4.307l4.98-2.936v2.183L3.746 5.267a.5.5 0 0 0-.233.42v4.563c0 .189.107.36.279.445l3.96 1.94c.14.07.308.067.45-.003l3.108-1.564 2.088 1.74zm3.672-4.852a.51.51 0 0 0-.552-.063l-3.18 1.6-3.453-1.692V5.959l2.737-1.713a.5.5 0 0 0 .234-.42V.497a.502.502 0 0 0-.76-.426L.746 3.598a.5.5 0 0 0-.245.427v7.942c0 .186.105.357.274.442l7.004 3.528a.5.5 0 0 0 .416.018l6.354-2.535a.495.495 0 0 0 .136-.84z"
                    />
                    <path
                        fill="url(#amazon-ecs-color-16__b)"
                        d="m14.496 10.035-1.958-1.52V5.688a.5.5 0 0 0-.237-.422L9.5 3.549V1.367l4.997 2.925zm.758-6.453-6-3.513a.51.51 0 0 0-.506-.004.5.5 0 0 0-.253.43v3.33c0 .172.09.332.237.422l2.802 1.717v2.792c0 .152.071.296.193.39l2.96 2.301a.5.5 0 0 0 .53.056.5.5 0 0 0 .283-.446V4.01a.49.49 0 0 0-.246-.427"
                    />
                </g>
                <defs>
                    <linearGradient
                        id="amazon-ecs-color-16__a"
                        x1={9.248}
                        x2={0.634}
                        y1={3.807}
                        y2={7.896}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset={0.261} stopColor="#f7981d" />
                        <stop offset={0.697} stopColor="#f37731" />
                        <stop offset={1} stopColor="#f1623e" />
                    </linearGradient>
                    <linearGradient
                        id="amazon-ecs-color-16__b"
                        x1={9.248}
                        x2={0.634}
                        y1={3.807}
                        y2={7.896}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset={0.261} stopColor="#f7981d" />
                        <stop offset={0.697} stopColor="#f37731" />
                        <stop offset={1} stopColor="#f1623e" />
                    </linearGradient>
                </defs>
            </svg>
        );
    }
);
