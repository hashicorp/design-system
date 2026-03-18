import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMessageCircle16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8.231 1A6.77 6.77 0 0 1 15 7.769a6.77 6.77 0 0 1-9.795 6.055 2 2 0 0 0-.113.016c-.171.029-.405.09-.678.176-.544.17-1.172.417-1.65.615-.208.086-.387.163-.512.218l-.146.063-.037.017-.01.004h-.002a.75.75 0 0 1-.99-.994l.001-.002.004-.008.017-.037a25 25 0 0 0 .28-.65c.198-.475.446-1.102.618-1.646.087-.274.146-.507.175-.679q.012-.076.016-.118A6.769 6.769 0 0 1 8.232 1m0 1.5a5.27 5.27 0 0 0-4.676 7.7c.104.199.123.404.124.534.003.145-.014.292-.037.428a7 7 0 0 1-.225.885c-.085.27-.186.554-.288.827.275-.103.563-.204.834-.289.3-.095.61-.18.879-.225.133-.022.282-.04.423-.038.128.002.335.019.535.122a5.271 5.271 0 0 0 7.7-4.676A5.27 5.27 0 0 0 8.23 2.5"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
