import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMusic24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill={color}
                    d="M19.38 2.05c1.371-.227 2.62.83 2.62 2.22v12.785a2.75 2.75 0 0 1-2.297 2.713l-2 .333A2.75 2.75 0 0 1 14.5 17.39v-.445a2.75 2.75 0 0 1 2.297-2.713l3.703-.617V4.27a.75.75 0 0 0-.874-.74l-9 1.5a.75.75 0 0 0-.626.74v13.285a2.75 2.75 0 0 1-2.298 2.713l-2 .333A2.75 2.75 0 0 1 2.5 19.39v-.445a2.75 2.75 0 0 1 2.298-2.713l3.702-.617V5.77c0-1.1.796-2.038 1.88-2.22zM5.045 17.71c-.602.101-1.044.623-1.045 1.234v.445c.001.771.694 1.36 1.456 1.233l2-.333A1.25 1.25 0 0 0 8.5 19.055v-1.92zm12-2c-.602.101-1.044.623-1.045 1.234v.445c.001.771.694 1.36 1.456 1.233l2-.333a1.25 1.25 0 0 0 1.044-1.234v-1.92z"
                />
            </svg>
        );
    }
);
