import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconVantageColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#9C24C7"
                    fillRule="evenodd"
                    d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm15.152 2.268a.44.44 0 00.623 0l3.103-3.102a.44.44 0 000-.623L16.775 7.44a.44.44 0 00-.623 0l-3.102 3.103a.44.44 0 000 .623l3.102 3.102zm-3.847 4.47l3.103-3.102a.44.44 0 000-.623l-3.103-3.103a.44.44 0 00-.623 0L8.58 15.012a.44.44 0 000 .624l3.102 3.102a.44.44 0 00.623 0zM4.11 11.166l3.102 3.102a.44.44 0 00.623 0l3.103-3.102a.44.44 0 000-.623L7.835 7.44a.44.44 0 00-.623 0L4.11 10.543a.44.44 0 000 .623z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
