import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconMapPin24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
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
                <g fill={color}>
                    <path d="M11.585 23.875L12 23.25l.415.625a.75.75 0 01-.83 0z" />
                    <path
                        fillRule="evenodd"
                        d="M12 6a4 4 0 100 8 4 4 0 000-8zm-2.5 4a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z"
                        clipRule="evenodd"
                    />
                    <path
                        fillRule="evenodd"
                        d="M11.585 23.875L12 23.25c.415.625.416.624.416.624l.002-.001.006-.004.023-.015.083-.057c.071-.05.175-.122.305-.216a31.98 31.98 0 004.333-3.777C19.51 17.344 22 13.837 22 9.954a9.932 9.932 0 00-2.93-7.04A10.023 10.023 0 0012 0a10.023 10.023 0 00-7.07 2.914A9.932 9.932 0 002 9.954c0 3.883 2.49 7.39 4.832 9.85a31.978 31.978 0 004.333 3.777c.13.094.234.166.306.216l.082.057.023.015.006.004.003.002zM5.988 3.978A8.523 8.523 0 0112 1.5c2.255 0 4.418.892 6.012 2.478A8.432 8.432 0 0120.5 9.955c0 3.276-2.135 6.417-4.418 8.815A30.46 30.46 0 0112 22.334a30.463 30.463 0 01-4.082-3.564C5.635 16.372 3.5 13.23 3.5 9.955c0-2.242.895-4.392 2.488-5.977z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
