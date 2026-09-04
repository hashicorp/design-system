import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconIncompleteNormal16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M10.3 13.623a.751.751 0 0 1 .475 1.424 7 7 0 0 1-.32.098.75.75 0 0 1-.401-1.447q.125-.035.247-.075M7.876.828a.5.5 0 0 1 .5.5v13.333a.5.5 0 0 1-.5.5 7.167 7.167 0 1 1 0-14.333m5.106 10.518a.75.75 0 0 1 1.313.726 7 7 0 0 1-.35.567.75.75 0 0 1-1.237-.849q.148-.213.274-.444M14.51 6.96a.75.75 0 0 1 .776.723 9 9 0 0 1 0 .634.75.75 0 1 1-1.499-.05 8 8 0 0 0 0-.53.75.75 0 0 1 .723-.777m-1.697-3.565a.75.75 0 0 1 1.052.138q.196.257.366.53a.75.75 0 0 1-1.274.79 5 5 0 0 0-.281-.407.75.75 0 0 1 .137-1.051M9.54 1.708a.75.75 0 0 1 .94-.49q.152.049.3.101a.75.75 0 0 1-.51 1.411 6 6 0 0 0-.24-.082.75.75 0 0 1-.49-.94"
                />
            </svg>
        );
    }
);
