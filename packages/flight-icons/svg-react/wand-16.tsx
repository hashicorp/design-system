import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconWand16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8.586 4.103a2 2 0 0 1 2.828 2.828L3.636 14.71a2 2 0 0 1-2.828-2.828zm-6.718 8.84a.5.5 0 1 0 .707.706L8.41 7.815l-.707-.707zm10.708-4.657a.5.5 0 0 1 .92 0l.522 1.219c.05.117.145.212.262.262l1.218.523a.5.5 0 0 1 0 .919l-1.217.522a.5.5 0 0 0-.263.263l-.523 1.219a.5.5 0 0 1-.919 0l-.522-1.219a.5.5 0 0 0-.263-.263l-1.219-.522a.5.5 0 0 1 0-.92l1.22-.522a.5.5 0 0 0 .262-.262zm-2.222-3.122a.5.5 0 0 0-.707 0l-.884.884.707.707.884-.884a.5.5 0 0 0 0-.707M3.433.833a.5.5 0 0 1 .65-.65l.982.392a.5.5 0 0 0 .37 0l.982-.393a.5.5 0 0 1 .65.65l-.393.981a.5.5 0 0 0 0 .372l.393.98a.5.5 0 0 1-.65.651l-.981-.392a.5.5 0 0 0-.371 0l-.982.392a.5.5 0 0 1-.65-.65l.392-.98a.5.5 0 0 0 0-.373zm8.75 0a.5.5 0 0 1 .65-.65l.732.292a.5.5 0 0 0 .37 0l.732-.293a.5.5 0 0 1 .65.65l-.292.731a.5.5 0 0 0 0 .372l.292.73a.5.5 0 0 1-.65.651l-.731-.293a.5.5 0 0 0-.371 0l-.732.293a.5.5 0 0 1-.65-.65l.293-.73a.5.5 0 0 0 0-.373z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
