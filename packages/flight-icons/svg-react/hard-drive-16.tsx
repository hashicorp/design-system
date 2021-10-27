import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconHardDrive16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
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
                    <path d="M3 11.25a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75z" />
                    <path
                        fillRule="evenodd"
                        d="M4.748 1a2.25 2.25 0 00-2.07 1.369L.18 8.235a2.25 2.25 0 00-.18.882v3.633A2.25 2.25 0 002.25 15h11.5A2.25 2.25 0 0016 12.75V9.117c0-.303-.061-.603-.18-.882L13.322 2.37A2.25 2.25 0 0011.252 1H4.748zm-.69 1.956a.75.75 0 01.69-.456h6.504c.3 0 .572.18.69.456L14.09 8H1.91l2.148-5.044zM1.5 9.5v3.25c0 .414.336.75.75.75h11.5a.75.75 0 00.75-.75V9.5h-13z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
