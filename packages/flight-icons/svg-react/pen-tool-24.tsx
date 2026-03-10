import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPenTool24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M1.218 1.22a.751.751 0 01.703-.2l14.75 3.5a.753.753 0 01.564.587l1.26 6.51.148-.147a.751.751 0 011.06 0l3.076 3.074a.754.754 0 010 1.061l-7.175 7.175a.754.754 0 01-1.061 0l-3.075-3.075a.751.751 0 010-1.06l.148-.149-6.51-1.26a.753.753 0 01-.587-.563l-3.5-14.75a.751.751 0 01.2-.703zM13.06 19.175l2.015 2.014 6.114-6.114-2.015-2.014-6.114 6.114zM9.474 8.415A3.002 3.002 0 0113.998 11c0 1.656-1.344 3-3 3a3.002 3.002 0 01-2.584-4.525L3.089 4.151l2.778 11.704 7.03 1.36 4.317-4.318-1.36-7.029L4.15 3.091l5.324 5.324zM11 9.5a1.501 1.501 0 000 3c.827 0 1.499-.673 1.5-1.5 0-.828-.673-1.5-1.5-1.5z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
