import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconBellOff24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M12 2.5c-1.4 0-2.734.487-3.83 1.31a.75.75 0 01-.9-1.2C8.602 1.609 10.247 1 12 1c4.298 0 8 3.665 8 7.983v5.167c0 .173.018.341.052.504a.75.75 0 11-1.467.31 3.939 3.939 0 01-.085-.814V8.983C18.5 5.5 15.476 2.5 12 2.5z" />
                    <path
                        fillRule="evenodd"
                        d="M4.71 5.77L1.22 2.28a.75.75 0 011.06-1.06l20.5 20.5a.75.75 0 11-1.06 1.06L16.94 18H1.75a.75.75 0 010-1.5C2.981 16.5 4 15.454 4 14.15V8.983c0-1.136.257-2.225.71-3.212zM15.44 16.5H4.717a3.917 3.917 0 00.782-2.35V8.983c0-.714.127-1.408.36-2.062l9.58 9.579z"
                        clipRule="evenodd"
                    />
                    <path d="M9.414 20.08a.75.75 0 011.007.334c.346.691.952 1.086 1.579 1.086s1.233-.395 1.58-1.086a.75.75 0 111.34.672C14.37 22.188 13.297 23 12 23c-1.296 0-2.369-.812-2.92-1.914a.75.75 0 01.334-1.007z" />
                </g>
            </svg>
        );
    }
);
