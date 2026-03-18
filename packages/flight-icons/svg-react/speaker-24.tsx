import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSpeaker24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color} fillRule="evenodd" clipRule="evenodd">
                    <path d="M12 9a5 5 0 1 0 0 10 5 5 0 0 0 0-10m-3.5 5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                    <path d="M5.75 1A2.75 2.75 0 0 0 3 3.75v16.5A2.75 2.75 0 0 0 5.75 23h12.5A2.75 2.75 0 0 0 21 20.25V3.75A2.75 2.75 0 0 0 18.25 1zM4.5 3.75c0-.69.56-1.25 1.25-1.25h12.5c.69 0 1.25.56 1.25 1.25v16.5c0 .69-.56 1.25-1.25 1.25H5.75c-.69 0-1.25-.56-1.25-1.25z" />
                </g>
            </svg>
        );
    }
);
