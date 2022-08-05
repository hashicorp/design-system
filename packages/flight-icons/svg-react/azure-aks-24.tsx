import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAzureAks24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M5.267 3.589L8.444 3l3.19 1.089v3.233L8.477 8.587V8.6l-.022-.005-.012.005-3.177-.678V3.59zM12.145 3.644l3.177-.588L18.5 4.144v3.223L15.333 8.65v.005l-.007-.002-.004.002-3.177-.678V3.644zM2 13.867l.011.002v.031l3.178.678L8.378 13.3v-3.233l-3.189-1.09-2.802.52-.387.07v4.3zM8.867 9.522l3.177-.589 3.178 1.09v3.233l-3.155 1.28v.008l-.015-.003-.008.003-.948-.205-2.23-.472.001-4.345zM15.722 9.578l3.178-.59.012.005.021-.004V9l3.156 1.078v3.233l-3.19 1.278-3.177-.678V9.578zM8.4 15.034v-.056l-3.21.622-.001 4.333 3.178.69.011-.005.022.004v-.013l1.968-.796 1.02-.39a.2.2 0 00.083-.055l.085-.035v-3.222L8.4 15.034zM12.056 15.655v4.334l3.177.678.012-.005.022.005v-.014l3.155-1.264v-3.233l-3.189-1.09-3.177.59z" />
                </g>
            </svg>
        );
    }
);
