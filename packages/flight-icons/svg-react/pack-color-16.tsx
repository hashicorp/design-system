import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPackColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#252960"
                    d="M4.3 9.866l-2.2-1.31a.392.392 0 00-.55.155.371.371 0 00-.05.206v2.62c0 .145.08.279.2.361l2.6 1.548c.12.072.28.072.4 0l2.6-1.547c.12-.073.2-.207.2-.362v-2.62a.408.408 0 00-.4-.412c-.07 0-.14.02-.2.051l-2.2 1.31a.396.396 0 01-.4 0z"
                />
                <path
                    fill="url(#pack-color-16__paint0_linear_1133_286)"
                    d="M4.5 10.228v2.62c0 .227.18.412.4.412.07 0 .14-.02.2-.051l2.2-1.31c.12-.072.2-.206.2-.361v-2.62a.408.408 0 00-.4-.413c-.07 0-.14.02-.2.051l-2.2 1.31a.432.432 0 00-.2.362z"
                />
                <path
                    fill="#DE156C"
                    d="M11.3 9.866l-2.2-1.31a.392.392 0 00-.55.155.371.371 0 00-.05.206v2.62c0 .145.08.279.2.361l2.6 1.548c.12.072.28.072.4 0l2.6-1.547c.12-.073.2-.207.2-.362v-2.62a.408.408 0 00-.4-.412c-.07 0-.14.02-.2.051l-2.2 1.31a.396.396 0 01-.4 0z"
                />
                <path
                    fill="url(#pack-color-16__paint1_linear_1133_286)"
                    d="M11.5 10.228v2.62c0 .227.18.412.4.412.07 0 .14-.02.2-.051l2.2-1.31c.12-.072.2-.206.2-.361v-2.62a.408.408 0 00-.4-.413c-.07 0-.14.02-.2.051l-2.2 1.31a.432.432 0 00-.2.362z"
                />
                <g>
                    <path
                        fill="#47529D"
                        d="M10.4 3.056l-2.2 1.31a.396.396 0 01-.4 0l-2.2-1.31a.392.392 0 00-.55.155.371.371 0 00-.05.206v2.62c0 .145.08.279.2.361l2.6 1.548c.12.072.28.072.4 0l2.6-1.548c.12-.072.2-.206.2-.36v-2.62a.408.408 0 00-.4-.413c-.07 0-.14.02-.2.051z"
                    />
                    <path
                        fill="url(#pack-color-16__paint2_linear_1133_286)"
                        d="M10.4 3.056l-2.2 1.31a.419.419 0 00-.2.361v2.62c0 .228.18.413.4.413.07 0 .14-.02.2-.051l2.2-1.31c.12-.073.2-.207.2-.362v-2.62a.408.408 0 00-.4-.412c-.07 0-.14.02-.2.051z"
                    />
                </g>
                <defs>
                    <linearGradient
                        id="pack-color-16__paint0_linear_1133_286"
                        x1={6.004}
                        x2={6.004}
                        y1={8.502}
                        y2={13.262}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#757CBA" />
                        <stop offset={1} stopColor="#252960" />
                    </linearGradient>
                    <linearGradient
                        id="pack-color-16__paint1_linear_1133_286"
                        x1={13.004}
                        x2={13.004}
                        y1={8.503}
                        y2={13.262}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#FC72C7" />
                        <stop offset={1} stopColor="#DE156C" />
                    </linearGradient>
                    <linearGradient
                        id="pack-color-16__paint2_linear_1133_286"
                        x1={9.504}
                        x2={9.504}
                        y1={3.002}
                        y2={7.762}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#8896DB" />
                        <stop offset={1} stopColor="#47529D" />
                    </linearGradient>
                </defs>
            </svg>
        );
    }
);
