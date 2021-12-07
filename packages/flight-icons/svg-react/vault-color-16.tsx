import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconVaultColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#000"
                    d="M0 0l7.971 15.99L16 0H0zm8.92 3.21h.928v.93H8.92v-.93zM7.073 6.922h-.928v-.928h.928v.928zm0-1.392h-.928v-.928h.928v.928zm0-1.39h-.928v-.93h.928v.93zm1.391 4.173h-.928V7.38h.928v.933zm0-1.391h-.928v-.928h.928v.928zm0-1.392h-.928v-.928h.928v.928zm0-1.39h-.928v-.93h.928v.93zm.456.462h.928v.928H8.92v-.928zm0 2.323v-.93h.928v.927l-.928.003z"
                />
            </svg>
        );
    }
);
