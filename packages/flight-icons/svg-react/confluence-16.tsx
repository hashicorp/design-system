import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconConfluence16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color} clipPath="url(#confluence-16__clip0_7057_70)">
                    <path d="M1.497 11.624c-.145.237-.308.51-.435.73a.446.446 0 00.15.606l2.898 1.783a.447.447 0 00.617-.151c.114-.194.263-.446.426-.716 1.148-1.895 2.306-1.663 4.386-.669l2.873 1.367a.448.448 0 00.6-.223l1.38-3.121a.446.446 0 00-.223-.584c-.606-.286-1.812-.857-2.898-1.378-3.915-1.904-7.235-1.78-9.774 2.356z" />
                    <path d="M14.492 4.535c.145-.237.308-.513.446-.73a.446.446 0 00-.151-.606l-2.899-1.784a.445.445 0 00-.615.152c-.116.194-.265.446-.428.716-1.148 1.895-2.303 1.663-4.385.669l-2.883-1.36a.446.446 0 00-.598.223L1.6 4.935a.446.446 0 00.223.585c.607.285 1.815.854 2.899 1.378 3.912 1.888 7.232 1.763 9.771-2.363z" />
                </g>
                <defs>
                    <clipPath id="confluence-16__clip0_7057_70">
                        <path
                            fill="#fff"
                            d="M0 0h14v14H0z"
                            transform="translate(1 1)"
                        />
                    </clipPath>
                </defs>
            </svg>
        );
    }
);
