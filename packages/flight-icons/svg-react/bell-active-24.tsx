import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconBellActive24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <g fill={color}>
                    <path d="M12 2.5c-3.476 0-6.5 3-6.5 6.483v5.167c0 .873-.29 1.693-.782 2.35h14.564a3.917 3.917 0 01-.782-2.35V8.983c0-.295-.022-.587-.064-.875a.75.75 0 011.485-.216c.052.357.079.722.079 1.091v5.167c0 1.304 1.019 2.35 2.25 2.35a.75.75 0 010 1.5H1.75a.75.75 0 010-1.5C2.981 16.5 4 15.454 4 14.15V8.983C4 4.665 7.702 1 12 1a7.631 7.631 0 012.389.385.75.75 0 11-.468 1.425A6.131 6.131 0 0012 2.5z" />
                    <path d="M21 3.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10.42 20.414a.75.75 0 00-1.34.672C9.63 22.188 10.703 23 12 23c1.296 0 2.369-.812 2.92-1.914a.75.75 0 10-1.34-.672c-.347.691-.953 1.086-1.58 1.086-.627 0-1.233-.395-1.58-1.086z" />
                </g>
            </svg>
        );
    }
);
