import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPhone16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill={color}
                    fillRule="evenodd"
                    d="M4.87 1.671a.71.71 0 00-.469-.171H2.208a.712.712 0 00-.671.48.702.702 0 00-.034.284c.227 2.129.954 4.175 2.12 5.972 1.175 1.81 2.348 2.976 4.153 4.145a13.697 13.697 0 005.957 2.117.709.709 0 00.766-.777 148.7 148.7 0 010-2.134.703.703 0 00-.605-.715c-.755-.1-1.496-.284-2.209-.55h-.002a.71.71 0 00-.746.158h-.002l-.922.922a.75.75 0 01-.9.121 12.403 12.403 0 01-4.656-4.646.75.75 0 01.122-.902l.924-.923a.704.704 0 00.158-.742L5.66 4.31a10.077 10.077 0 01-.55-2.205.704.704 0 00-.24-.433zM4.39.001a2.21 2.21 0 012.205 1.895v.007c.086.643.243 1.273.47 1.88l-.703.263.702-.264a2.203 2.203 0 01-.497 2.327l-.003.003-.51.509a10.903 10.903 0 003.314 3.306l.514-.514a2.209 2.209 0 012.327-.496c.609.227 1.24.384 1.885.468l.006.001a2.209 2.209 0 011.9 2.239 151.01 151.01 0 000 2.086v.075a2.204 2.204 0 01-2.407 2.205l-.014-.001a15.197 15.197 0 01-6.618-2.35c-1.981-1.282-3.306-2.6-4.596-4.587A15.131 15.131 0 01.01 2.416L.01 2.404A2.202 2.202 0 011.317.188 2.21 2.21 0 012.207 0H4.39z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
