import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAmazonEcs16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="m14.495 10.057-1.958-1.52v-2.83a.5.5 0 0 0-.238-.422L9.496 3.568V1.384l5 2.927zm.759-6.457L9.25.085a.51.51 0 0 0-.506-.004.5.5 0 0 0-.253.431v3.332c0 .172.09.332.237.422l2.804 1.717v2.795c0 .152.071.296.193.39l2.962 2.303a.5.5 0 0 0 .53.055.5.5 0 0 0 .283-.446V4.028a.49.49 0 0 0-.246-.428M8.034 14.96l-6.53-3.289V4.31L6.488 1.37v2.185L3.747 5.27a.5.5 0 0 0-.232.42v4.567c0 .188.107.36.279.445l3.962 1.94c.141.07.309.068.45-.002l3.11-1.565 2.09 1.74zm3.675-4.855a.51.51 0 0 0-.552-.063l-3.182 1.6L4.52 9.95V5.963l2.738-1.715a.5.5 0 0 0 .234-.42V.498a.502.502 0 0 0-.76-.426L.745 3.6a.5.5 0 0 0-.245.428v7.946c0 .187.106.358.274.442l7.008 3.53a.5.5 0 0 0 .416.018l6.358-2.536a.496.496 0 0 0 .136-.841z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
