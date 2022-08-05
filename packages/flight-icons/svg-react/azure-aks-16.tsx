import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAzureAks16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M3.287 2.412L5.51 2l2.232.762v2.264l-2.209.885v.009l-.015-.003-.008.003-2.217-.473-.007-.001V2.412zM10.325 2.039l2.225.762v2.256l-2.217.899v.003l-.005-.001h-.002L8.1 5.485V2.451l2.224-.412zM1 9.607l.008.001v.022l2.224.474 2.232-.894V6.947l-2.232-.763-1.97.365L1 6.597v3.01zM5.807 6.566l2.224-.413 2.224.763v2.263l-2.208.896v.006l-.01-.002-.006.002-.652-.141-1.572-.333V6.566zM10.605 6.604l2.225-.412.008.003.015-.003V6.2l2.21.754v2.264l-2.233.894-2.225-.474V6.604zM5.48 10.424v-.04l-2.244.435-.004.001v3.033l2.225.482.008-.003.015.004v-.01l1.374-.555.718-.275a.14.14 0 00.058-.039l.059-.024v-2.255l-2.209-.755zM10.263 10.447l-2.224.412v3.033l2.224.475.008-.004.016.004v-.01l2.208-.885V11.21l-2.232-.762z" />
                </g>
            </svg>
        );
    }
);
