import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconBitbucketColor16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
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
                    fill="#2684FF"
                    fillRule="evenodd"
                    d="M1.403 2.15A.43.43 0 011.73 2l12.54.002a.43.43 0 01.424.496l-1.81 11.135a.43.43 0 01-.425.36H3.693a.585.585 0 01-.568-.478l-1.82-11.02a.425.425 0 01.098-.345zm5.203 7.814H9.41l.677-3.93H5.859l.747 3.93z"
                    clipRule="evenodd"
                />
                <path
                    fill="url(#bitbucket-color-16__paint0_linear_707:135)"
                    d="M14.122 6.033H10.1l-.67 3.931H6.604L3.317 13.86c.105.09.238.139.376.14h8.766a.43.43 0 00.425-.36l1.238-7.607z"
                />
                <defs>
                    <linearGradient
                        id="bitbucket-color-16__paint0_linear_707:135"
                        x1={11.544}
                        x2={6.918}
                        y1={4.676}
                        y2={11.282}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset={0.18} stopColor="#0052CC" />
                        <stop offset={1} stopColor="#2684FF" />
                    </linearGradient>
                </defs>
            </svg>
        );
    }
);
