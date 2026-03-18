import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAwsLambdaColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#fa7e14"
                    d="M11.976 12.528c-.076.104-.14.19-.202.277l-2.953 4.196q-1.372 1.95-2.749 3.9a.18.18 0 0 1-.13.074 913 913 0 0 1-3.885-.04c-.014 0-.029-.005-.057-.01a1 1 0 0 1 .036-.075l2.71-4.055 2.405-3.59q1.333-1.995 2.665-3.993c.131-.196.268-.389.392-.589a.24.24 0 0 0 .027-.177q-.36-1.103-.727-2.205c-.104-.315-.213-.627-.311-.944-.032-.101-.084-.132-.191-.132q-1.22.003-2.434.002c-.154 0-.155 0-.155-.146q0-1.445-.003-2.889c0-.107.037-.13.141-.13q2.45.003 4.9 0a.16.16 0 0 1 .109.024c.032.02.054.052.064.087a26143 26143 0 0 0 5.6 13.585q.47 1.135.935 2.271c.037.093.075.11.171.082.857-.256 1.715-.504 2.57-.76.108-.033.147-.01.18.092q.44 1.329.886 2.654c.01.03.018.061.03.104-.061.022-.119.046-.178.062q-2.918.892-5.835 1.787c-.093.028-.12-.003-.152-.078q-.89-2.178-1.785-4.355l-1.752-4.263-.261-.641c-.014-.037-.033-.069-.06-.125"
                />
            </svg>
        );
    }
);
