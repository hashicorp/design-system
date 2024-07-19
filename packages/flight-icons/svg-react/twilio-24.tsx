import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconTwilio24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 1c6.072 0 11 4.928 11 11s-4.928 11-11 11S1 18.072 1 12 5.928 1 12 1zm0 2.904A8.075 8.075 0 003.904 12 8.075 8.075 0 0012 20.096 8.075 8.075 0 0020.096 12 8.075 8.075 0 0012 3.904zm2.728 8.536a2.288 2.288 0 110 4.576 2.288 2.288 0 010-4.576zm-5.456 0a2.288 2.288 0 110 4.576 2.288 2.288 0 010-4.576zm5.456-5.456a2.288 2.288 0 110 4.576 2.288 2.288 0 010-4.576zm-5.456 0a2.288 2.288 0 110 4.576 2.288 2.288 0 010-4.576z"
                />
            </svg>
        );
    }
);
