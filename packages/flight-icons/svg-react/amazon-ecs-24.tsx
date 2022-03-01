import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAmazonEcs24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M20.369 15.2l-2.571-1.996V9.49a.65.65 0 00-.311-.554l-3.68-2.254V3.817l6.562 3.84V15.2zm.995-8.474l-7.88-4.614a.67.67 0 00-.664-.006.652.652 0 00-.332.566v4.373c0 .226.119.435.311.554l3.68 2.254v3.668c0 .2.094.388.253.512l3.889 3.022a.658.658 0 00.695.073.65.65 0 00.372-.585V7.286a.648.648 0 00-.324-.56zM11.89 21.634l-8.57-4.317v-9.66L9.859 3.8v2.867l-3.596 2.25a.653.653 0 00-.306.552v5.993a.65.65 0 00.366.584l5.2 2.547a.667.667 0 00.592-.003l4.082-2.054 2.742 2.284-7.05 2.814zm4.822-6.373a.67.67 0 00-.724-.082l-4.176 2.1-4.535-2.221V9.826l3.594-2.25a.65.65 0 00.307-.552V2.653a.66.66 0 00-.997-.56L2.322 6.726a.65.65 0 00-.322.56v10.43c0 .245.138.47.36.58l9.198 4.634a.66.66 0 00.546.023l8.345-3.328a.65.65 0 00.178-1.104l-3.916-3.26z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
