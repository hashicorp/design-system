import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconVaultSecrets16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M7.196 15v-2.917c0-.676.047-1.353.14-2.03l.07-.63-.396.49c-.42.537-.862 1.05-1.351 1.54l-2.05 2.054-1.118-1.12 2.05-2.054c.489-.49 1.001-.933 1.537-1.353l.49-.397-.63.07a14.79 14.79 0 01-2.026.14H1V7.207h6.196V1H8.78v2.917c0 .676-.046 1.353-.14 2.03l-.07.63.397-.49c.419-.537.862-1.05 1.35-1.54l2.05-2.054 1.119 1.12-2.027 2.054c-.489.49-1.001.933-1.537 1.353l-.49.397.63-.07c.675-.094 1.35-.14 2.026-.14H15v1.586H8.804V15H7.196zm3.145-3.523v-1.12h1.118l2.027 2.03-1.118 1.12-2.027-2.03zM4.517 5.643l-2.026-2.03 1.118-1.12 2.027 2.03v1.12H4.517z"
                />
            </svg>
        );
    }
);
