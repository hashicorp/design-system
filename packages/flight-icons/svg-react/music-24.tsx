import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMusic24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M19.38 2.051A2.25 2.25 0 0 1 22 4.271v12.785a2.75 2.75 0 0 1-2.298 2.713l-2 .333a2.75 2.75 0 0 1-3.202-2.713v-.444a2.75 2.75 0 0 1 2.298-2.713l3.702-.617V4.27a.75.75 0 0 0-.873-.74l-9 1.5a.75.75 0 0 0-.627.74v13.285a2.75 2.75 0 0 1-2.298 2.713l-2 .333A2.75 2.75 0 0 1 2.5 19.389v-.444a2.75 2.75 0 0 1 2.298-2.713l3.702-.617V5.77c0-1.1.795-2.04 1.88-2.22zM5.045 17.711A1.25 1.25 0 0 0 4 18.945v.444c0 .772.694 1.36 1.455 1.233l2-.333A1.25 1.25 0 0 0 8.5 19.056v-1.92zm12-2A1.25 1.25 0 0 0 16 16.945v.444c0 .772.694 1.36 1.455 1.233l2-.333a1.25 1.25 0 0 0 1.045-1.233v-1.92z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
