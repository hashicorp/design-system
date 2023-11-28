import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAccessibility16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M6.012 12.82a.75.75 0 001.057-.082L8 11.652l.93 1.086a.75.75 0 101.14-.976l-1.32-1.54V8.5c0-.04-.003-.08-.01-.12a4.98 4.98 0 00.246-.077c.312-.106.627-.245.902-.377a13.733 13.733 0 00.975-.52l.016-.009.005-.003h.001s.001-.001-.385-.644l.386.643a.75.75 0 00-.772-1.286l-.003.002-.011.007-.05.028a11.425 11.425 0 01-.811.43c-.246.118-.503.23-.74.31C8.25 6.97 8.084 7 8 7c-.083 0-.25-.03-.5-.116a7.039 7.039 0 01-.739-.31 12.259 12.259 0 01-.812-.43L5.9 6.116l-.011-.007-.003-.002a.75.75 0 00-.772 1.286L5.5 6.75l-.386.643.002.001.005.003.016.01a8.673 8.673 0 00.273.155c.177.099.425.231.702.364.275.132.59.27.902.377.078.027.16.054.245.078a.755.755 0 00-.009.119v1.723l-1.32 1.539a.75.75 0 00.082 1.057z" />
                    <path d="M8 6.25a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    <path
                        fillRule="evenodd"
                        d="M0 8a8 8 0 1116 0A8 8 0 010 8zm8-6.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
