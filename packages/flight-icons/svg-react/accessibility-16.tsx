import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAccessibility16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0m0 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13m2.114 4.607a.75.75 0 1 1 .773 1.286L10.5 6.75l.386.644h-.002l-.005.003-.017.01-.06.034q-.076.046-.211.122c-.178.098-.426.23-.703.363-.275.132-.59.271-.902.378a5 5 0 0 1-.246.077q.01.058.01.119v1.723l1.32 1.539a.75.75 0 0 1-1.14.976L8 11.652l-.93 1.086a.75.75 0 0 1-1.14-.976l1.32-1.54V8.5q0-.06.01-.12a5 5 0 0 1-.246-.076 9 9 0 0 1-.902-.378 14 14 0 0 1-.703-.364q-.134-.075-.212-.12l-.06-.035-.016-.01-.005-.002-.003-.002a.75.75 0 0 1 .774-1.286l.002.001.011.007.05.03a12 12 0 0 0 .812.43c.245.117.502.229.738.31.25.085.417.115.5.115s.25-.03.5-.115a7 7 0 0 0 .738-.31 12 12 0 0 0 .813-.43l.049-.03.011-.007zM8 3.25a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3"
                />
            </svg>
        );
    }
);
