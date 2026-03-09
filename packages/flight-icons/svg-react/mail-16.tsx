import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMail16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.75 1A2.25 2.25 0 0116 3.25v9.5A2.25 2.25 0 0113.75 15H2.25A2.25 2.25 0 010 12.75v-9.5A2.25 2.25 0 012.25 1h11.5zM8.464 9.84a.75.75 0 01-.927 0l-.99-.777L2.515 13.5h10.972L9.452 9.062l-.988.778zM1.5 12.385l3.865-4.251L1.5 5.097v7.288zm9.135-4.251l3.865 4.25V5.098l-3.865 3.037zM2.25 2.5a.75.75 0 00-.748.69L8 8.296l6.498-5.106a.75.75 0 00-.748-.69H2.25z"
                />
            </svg>
        );
    }
);
