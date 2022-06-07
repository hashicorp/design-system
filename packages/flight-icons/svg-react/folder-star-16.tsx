import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconFolderStar16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M1.5 3.25a.75.75 0 01.75-.75h4.379a.75.75 0 01.53.22L8.28 3.84a2.25 2.25 0 001.591.659h3.879a.75.75 0 01.75.75V6.5a.75.75 0 101.5 0V5.25A2.25 2.25 0 0013.75 3H9.871a.75.75 0 01-.53-.22L8.22 1.66A2.25 2.25 0 006.629 1H2.25A2.25 2.25 0 000 3.25v9.5A2.25 2.25 0 002.25 15h2.5a.75.75 0 000-1.5h-2.5a.75.75 0 01-.75-.75v-9.5z" />
                    <path
                        fillRule="evenodd"
                        d="M11.179 5.431a.75.75 0 00-1.358 0L8.523 8.196l-2.887.444a.75.75 0 00-.409 1.279l2.201 2.142-.66 3.029a.75.75 0 001.089.82l2.643-1.43 2.643 1.43a.75.75 0 001.09-.82l-.661-3.03 2.201-2.141a.75.75 0 00-.41-1.28l-2.886-.443-1.298-2.765zM9.71 9.195l.789-1.68.789 1.68a.75.75 0 00.565.423l1.794.276-1.421 1.382a.75.75 0 00-.21.697l.402 1.839-1.562-.845a.75.75 0 00-.714 0l-1.562.845.402-1.838a.75.75 0 00-.21-.698l-1.42-1.382 1.793-.276a.75.75 0 00.565-.423z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
