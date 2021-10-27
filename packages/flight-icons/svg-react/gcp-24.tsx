import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconGcp24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
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
                    d="M17.157 5.95l.004.004a7.78 7.78 0 012.355 3.78 5.599 5.599 0 012.23 6.317A5.645 5.645 0 0116.306 20l-8.692-.002c-1.227.005-2.427-.429-3.408-1.163l-.002.003a5.608 5.608 0 01-1.91-6.252 5.612 5.612 0 012.108-2.804A7.853 7.853 0 019.71 4.326a7.913 7.913 0 017.448 1.624zm1.322 8.434a2.165 2.165 0 01-2.172 2.16l-8.692-.004s-.428 0-.915-.226a2.156 2.156 0 01-1.231-2.26 2.165 2.165 0 011.843-1.834 2.174 2.174 0 012.285 1.249l2.52-2.505a5.647 5.647 0 00-3.367-2.09l.018-.02c1.546-1.689 4.168-1.91 5.954-.473l.002.001a4.302 4.302 0 011.583 3.413v.43c1.2 0 2.172.967 2.172 2.16z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
