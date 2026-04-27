import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconLearn16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M7.685 2.07a.75.75 0 0 1 .63 0l7 3.25a.75.75 0 0 1 .435.68c0 .291-.17.557-.435.68l-1.433.665A.75.75 0 0 1 14 7.75V11a.76.76 0 0 1-.095.365l-.002.003-.002.005-.006.01-.02.034-.065.1c-.054.08-.133.189-.238.315-.21.252-.53.579-.977.901C11.69 13.385 10.287 14 8.25 14c-2.033 0-3.543-.612-4.552-1.238a7 7 0 0 1-1.132-.866 5 5 0 0 1-.372-.39l-.03-.04-.004-.002v-.002l-.002-.001A.76.76 0 0 1 2 11V7.75c0-.148.044-.288.118-.405L.685 6.68A.75.75 0 0 1 .25 6c0-.292.17-.557.435-.68zm.63 7.86a.75.75 0 0 1-.63 0L3.5 7.987v2.725q.043.044.098.095c.19.181.488.43.891.681.805.5 2.044 1.012 3.761 1.012 1.713 0 2.81-.51 3.468-.984a3.8 3.8 0 0 0 .782-.745V7.987zM2.781 6 8 8.423 13.219 6 8 3.577z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
