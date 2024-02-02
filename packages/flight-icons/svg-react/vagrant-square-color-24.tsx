import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconVagrantSquareColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#1868F2"
                    fillRule="evenodd"
                    d="M20.8 1H3.2c-.577 0-.949 0-1.232.024-.272.022-.373.06-.422.085a1 1 0 00-.437.437c-.025.05-.063.15-.085.422C1 2.25 1 2.623 1 3.2v17.6c0 .577 0 .949.024 1.232.022.272.06.372.085.422a1 1 0 00.437.437c.05.025.15.063.422.085C2.25 23 2.623 23 3.2 23h17.6c.577 0 .949 0 1.232-.024.272-.022.372-.06.422-.085a1 1 0 00.437-.437c.025-.05.063-.15.085-.422C23 21.75 23 21.377 23 20.8V3.2c0-.577 0-.949-.024-1.232-.022-.272-.06-.373-.085-.422a1 1 0 00-.437-.437c-.05-.025-.15-.063-.422-.085C21.75 1 21.377 1 20.8 1zM.218 1.092C0 1.52 0 2.08 0 3.2v17.6c0 1.12 0 1.68.218 2.108a2 2 0 00.874.874C1.52 24 2.08 24 3.2 24h17.6c1.12 0 1.68 0 2.108-.218a2 2 0 00.874-.874C24 22.48 24 21.92 24 20.8V3.2c0-1.12 0-1.68-.218-2.108a2 2 0 00-.874-.874C22.48 0 21.92 0 20.8 0H3.2C2.08 0 1.52 0 1.092.218a2 2 0 00-.874.874z"
                    clipRule="evenodd"
                />
                <path
                    fill="#1868F2"
                    d="M17.08 4.75l-3.156 1.83v1.123L12 12.245l-1.924-4.542V6.58L6.92 4.75 5 5.864v1.293l4.276 10.514L12 19.25l2.724-1.579L19 7.157V5.864L17.08 4.75z"
                />
                <path
                    fill="#0850C5"
                    d="M19 5.864l-3.157 1.83v1.124L13.28 14.57l-1.28.742v3.938l2.724-1.579L19 7.157V5.864zM10.076 7.703V6.58l-1.92 1.113v1.125l2.564 5.751 1.28-.742v-1.582l-1.924-4.542z"
                />
            </svg>
        );
    }
);
