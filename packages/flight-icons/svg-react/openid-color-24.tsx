import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconOpenidColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fillRule="evenodd" clipRule="evenodd">
                    <path
                        fill="#F8941C"
                        d="M11.127 5.069v15.64l2.793-1.308V3.71l-2.793 1.358z"
                    />
                    <path
                        fill="#BCBEC0"
                        d="M5.542 14.757c0-1.97 2.156-3.63 5.095-4.136V8.855c-4.495.54-7.887 2.977-7.887 5.902 0 3.03 3.641 5.535 8.377 5.952v-1.743c-3.186-.398-5.585-2.131-5.585-4.21zm8.868-5.902v1.766c1.17.201 2.215.584 3.05 1.098l1.974-1.215c-1.345-.828-3.082-1.415-5.024-1.649z"
                    />
                    <path
                        fill="#BCBEC0"
                        d="M20.798 9.657l.386 3.985-5.4-1.17"
                    />
                </g>
            </svg>
        );
    }
);
