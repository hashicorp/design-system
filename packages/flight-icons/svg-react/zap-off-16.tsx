import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconZapOff16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M1.22 1.22a.75.75 0 0 1 1.06 0l12.5 12.5a.75.75 0 0 1 0 1.06.75.75 0 0 1-1.06 0l-2.845-2.846-3.354 3.81a.751.751 0 0 1-1.31-.57l.452-4.489-5.047-.912a.751.751 0 0 1-.43-1.233l2.947-3.347L1.22 2.28a.75.75 0 0 1 0-1.06m1.97 7.314 4.422.799c.384.07.652.425.613.813l-.287 2.855 1.873-2.13-4.616-4.615zm7.195-2.21a.75.75 0 0 1 .863-.618l3.125.518a.752.752 0 0 1 .44 1.236l-1.216 1.38a.75.75 0 0 1-1.126-.991l.323-.366-1.792-.297a.75.75 0 0 1-.617-.863M8.478.253a.752.752 0 0 1 1.3.643l-.718 3.56a.75.75 0 0 1-.882.589.75.75 0 0 1-.588-.884l.164-.813-.155.175a.75.75 0 0 1-1.126-.991z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
