import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAwsLambda24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12.048 12.523c-.075.104-.139.19-.2.277l-2.912 4.19q-1.355 1.95-2.712 3.895a.18.18 0 0 1-.129.073 873 873 0 0 1-3.831-.04c-.014 0-.029-.004-.057-.009a1 1 0 0 1 .036-.076l2.673-4.048 2.372-3.587 2.63-3.986c.129-.196.263-.389.386-.588a.24.24 0 0 0 .026-.177q-.355-1.103-.717-2.202c-.103-.315-.21-.627-.307-.943-.03-.101-.082-.132-.188-.132-.803.003-1.6.003-2.4.003-.153 0-.153 0-.153-.147q0-1.443-.003-2.884c0-.107.036-.131.139-.131q2.415.003 4.834 0a.16.16 0 0 1 .106.024q.048.033.064.088l2.549 6.263 2.974 7.303q.464 1.132.922 2.268c.037.092.075.11.17.081.844-.255 1.69-.503 2.535-.759.106-.032.145-.01.178.093q.433 1.325.873 2.65c.01.03.018.061.03.104-.06.021-.117.046-.176.061l-5.756 1.785c-.091.028-.119-.002-.15-.078q-.878-2.175-1.76-4.349l-1.728-4.257q-.13-.32-.258-.64c-.014-.037-.033-.069-.06-.125"
                />
            </svg>
        );
    }
);
