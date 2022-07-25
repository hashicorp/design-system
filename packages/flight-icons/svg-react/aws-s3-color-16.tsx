import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAwsS3Color16 = forwardRef<SVGSVGElement, IconProps>(
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
                        fill="#E25444"
                        d="M13.481 3.094l-2.52 4.937 2.52 4.938 1.033-.594V3.687l-1.033-.593z"
                    />
                    <path
                        fill="#7B1D13"
                        d="M13.481 3.094l-5.042.594L5.873 8.03l2.566 4.344 5.042.594V3.094z"
                    />
                    <path
                        fill="#58150D"
                        d="M3.306 3.094l-.82.375v9.125l.82.375L8.44 8.03 3.306 3.094z"
                    />
                    <path
                        fill="#E25444"
                        d="M3.295 3.083l5.151 1.473v7.083l-5.15 1.333V3.083z"
                    />
                    <path
                        fill="#58150D"
                        d="M8.449 5.333l-2.187-.36 2.187-2.556 2.182 2.555-2.182.361z"
                    />
                    <path
                        fill="#58150D"
                        d="M10.63 4.972l-2.184.367-2.184-.367V2.417M8.449 10.694l-2.187.417 2.187 2.195 2.182-2.195-2.182-.417z"
                    />
                    <path
                        fill="#7B1D13"
                        d="M8.44.5L6.251 1.688v3.28l2.194-.635L8.44.5zM8.446 6.139l-2.184.244V9.66l2.184.257V6.139zM8.446 11.667l-2.184-.564v3.22L8.446 15.5v-3.833z"
                    />
                    <path
                        fill="#E25444"
                        d="M10.63 11.103l-2.184.564V15.5l2.184-1.176v-3.22zM8.446 6.139l2.184.244V9.66l-2.184.257V6.139zM8.44.5l2.186 1.188v3.28L8.44 4.345V.5z"
                    />
                </g>
            </svg>
        );
    }
);
