import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconLineChartUp16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M0 3.25A2.25 2.25 0 012.25 1h11.5A2.25 2.25 0 0116 3.25v9.5A2.25 2.25 0 0113.75 15H2.25A2.25 2.25 0 010 12.75v-9.5zm2.25-.75a.75.75 0 00-.75.75v7.075L5.61 7.86a.73.73 0 01.278-.101.747.747 0 01.318.02L9.08 8.6l1.328-2.988-.9.405a.75.75 0 01-.615-1.368l2.58-1.16a.75.75 0 01.991.376l1.16 2.58a.75.75 0 01-1.367.615l-.428-.951-1.638 3.686a.75.75 0 01-.908.423L6.107 9.31 1.5 12.075v.675c0 .414.336.75.75.75H5V13a.75.75 0 011.5 0v.5h3V13a.75.75 0 011.5 0v.5h2.75a.75.75 0 00.75-.75v-9.5a.75.75 0 00-.75-.75H2.25z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
