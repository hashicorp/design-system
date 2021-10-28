import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconClipboardChecked16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill={color}
                    fillRule="evenodd"
                    d="M11.975 1h.775A2.25 2.25 0 0115 3.25v10.5A2.25 2.25 0 0112.75 16h-9.5A2.25 2.25 0 011 13.75V3.25A2.25 2.25 0 013.25 1h.775c.116-.57.62-1 1.225-1h5.5c.605 0 1.11.43 1.225 1zM5.5 2.5v-1h5v1h-5zm6.28 3.72a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-2-2a.75.75 0 011.06-1.06l1.47 1.47 3.97-3.97a.75.75 0 011.06 0z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
