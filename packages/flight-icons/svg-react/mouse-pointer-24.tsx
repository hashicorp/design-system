import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMousePointer24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M2.22 2.22a.75.75 0 01.818-.162l17.5 7.29c.287.12.472.407.462.718a.753.753 0 01-.509.685l-6.48 2.2 5.77 5.769a.751.751 0 01-1.06 1.06l-5.77-5.768-2.2 6.48a.753.753 0 01-.685.508.752.752 0 01-.717-.462l-7.291-17.5a.75.75 0 01.162-.818zm7.75 15.908l1.949-5.74a.75.75 0 01.469-.47l5.74-1.948L4.143 4.143 9.97 18.128z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
