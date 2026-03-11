import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconClipboardX16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M10.75 0c.605 0 1.109.43 1.225 1h.775A2.25 2.25 0 0115 3.25v10.5A2.25 2.25 0 0112.75 16h-9.5A2.25 2.25 0 011 13.75V3.25A2.25 2.25 0 013.25 1h.775c.116-.57.62-1 1.225-1h5.5zm.298 5.952a.775.775 0 00-1.096 0L8 7.904 6.048 5.952a.775.775 0 10-1.096 1.096L6.904 9l-1.952 1.952a.775.775 0 101.096 1.096L8 10.096l1.952 1.952a.775.775 0 101.096-1.096L9.096 9l1.952-1.952a.775.775 0 000-1.096zM5.5 2.5h5v-1h-5v1z"
                />
            </svg>
        );
    }
);
