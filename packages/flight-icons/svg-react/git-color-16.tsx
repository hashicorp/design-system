import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGitColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#F03C2E"
                    fillRule="evenodd"
                    d="M8.003 15a.903.903 0 01-.626-.264L1.264 8.623a.903.903 0 010-1.275l4.192-4.19 1.587 1.587a1.074 1.074 0 00.582 1.407v3.843A1.077 1.077 0 007.04 11.4a1.072 1.072 0 101.466-1.372V6.218l1.448 1.447a1.073 1.073 0 10.642-.604L9.045 5.509a1.072 1.072 0 00-1.356-1.365l-1.61-1.61 1.27-1.27a.902.902 0 011.275 0l6.112 6.113a.903.903 0 01.264.616v.042a.903.903 0 01-.264.617l-6.084 6.084a.903.903 0 01-.626.264h-.023z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
