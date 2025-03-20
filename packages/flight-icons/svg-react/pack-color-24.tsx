import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPackColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#DE156C"
                    d="M16.933 14.686L13.45 12.59a.617.617 0 00-.87.247.599.599 0 00-.08.33v4.193c0 .231.127.445.317.578l4.116 2.475c.19.116.444.116.634 0l4.116-2.475A.672.672 0 0022 17.36v-4.192c0-.364-.285-.66-.633-.66a.696.696 0 00-.317.082l-3.483 2.096a.622.622 0 01-.634 0z"
                />
                <path
                    fill="url(#pack-color-24__paint0_linear_7503_121)"
                    d="M17.25 15.264v4.192c0 .364.285.66.633.66.111 0 .222-.032.317-.082l3.483-2.096A.672.672 0 0022 17.36v-4.192c0-.364-.285-.66-.633-.66a.696.696 0 00-.317.082l-3.483 2.096a.694.694 0 00-.317.578z"
                />
                <path
                    fill="#47529D"
                    d="M15.8 3.59l-3.483 2.096a.622.622 0 01-.634 0L8.2 3.59a.617.617 0 00-.87.247.6.6 0 00-.08.33V8.36c0 .23.127.446.317.578l4.116 2.475c.19.116.444.116.634 0l4.116-2.475a.672.672 0 00.317-.578V4.168c0-.364-.285-.66-.633-.66a.697.697 0 00-.317.082z"
                />
                <path
                    fill="url(#pack-color-24__paint1_linear_7503_121)"
                    d="M15.8 3.59l-3.483 2.096a.671.671 0 00-.317.578v4.192c0 .363.285.66.633.66.111 0 .222-.033.317-.082l3.483-2.096a.672.672 0 00.317-.578V4.168c0-.364-.285-.66-.633-.66a.697.697 0 00-.317.082z"
                />
                <g>
                    <path
                        fill="#252960"
                        d="M6.433 14.686L2.95 12.59a.617.617 0 00-.87.247.6.6 0 00-.08.33v4.193c0 .231.127.445.317.578l4.116 2.475c.19.116.444.116.634 0l4.116-2.475a.672.672 0 00.317-.578v-4.192c0-.364-.285-.66-.633-.66a.696.696 0 00-.317.082l-3.483 2.096a.621.621 0 01-.634 0z"
                    />
                    <path
                        fill="url(#pack-color-24__paint2_linear_7503_121)"
                        d="M6.75 15.264v4.192c0 .364.285.66.633.66.111 0 .222-.032.317-.082l3.483-2.096a.672.672 0 00.317-.578v-4.192c0-.364-.285-.66-.633-.66a.696.696 0 00-.317.082l-3.483 2.096a.694.694 0 00-.317.578z"
                    />
                </g>
                <defs>
                    <linearGradient
                        id="pack-color-24__paint0_linear_7503_121"
                        x1={19.631}
                        x2={19.631}
                        y1={12.504}
                        y2={20.119}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#FC72C7" />
                        <stop offset={1} stopColor="#DE156C" />
                    </linearGradient>
                    <linearGradient
                        id="pack-color-24__paint1_linear_7503_121"
                        x1={14.381}
                        x2={14.381}
                        y1={3.504}
                        y2={11.119}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#8896DB" />
                        <stop offset={1} stopColor="#47529D" />
                    </linearGradient>
                    <linearGradient
                        id="pack-color-24__paint2_linear_7503_121"
                        x1={9.131}
                        x2={9.131}
                        y1={12.504}
                        y2={20.119}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#757CBA" />
                        <stop offset={1} stopColor="#252960" />
                    </linearGradient>
                </defs>
            </svg>
        );
    }
);
