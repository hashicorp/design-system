import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconVaultSecrets24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M11.315 15.507v2.49h1.367V12.68H18v-1.367h-2.494c-.58 0-1.17.037-1.747.11l-.537.067.43-.333c.46-.357.9-.744 1.314-1.157l1.764-1.763-.967-.967-1.764 1.763c-.41.414-.8.854-1.157 1.314l-.334.43.067-.537c.074-.577.11-1.163.11-1.747V6h-1.367v5.317H6v1.366h2.494c.58 0 1.17-.036 1.747-.11l.537-.066-.43.333c-.46.357-.904.743-1.314 1.157L7.27 15.76l.967.967 1.764-1.764c.41-.41.8-.853 1.157-1.313l.334-.427-.067.537a13.89 13.89 0 00-.11 1.747z" />
                    <path d="M14.009 14.01v.967l1.75 1.75.967-.967-1.75-1.75h-.967zM7.27 8.24l1.75 1.75h.968v-.967l-1.75-1.75-.968.967z" />
                    <path
                        fillRule="evenodd"
                        d="M4 1.25A2.75 2.75 0 001.25 4v16A2.75 2.75 0 004 22.75h16A2.75 2.75 0 0022.75 20V4A2.75 2.75 0 0020 1.25H4zM2.75 4c0-.69.56-1.25 1.25-1.25h16c.69 0 1.25.56 1.25 1.25v16c0 .69-.56 1.25-1.25 1.25H4c-.69 0-1.25-.56-1.25-1.25V4z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
