import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconVaultSecretsColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill="#FFD814">
                    <path d="M7.552 10.8v2h1.104V8.544h4.256V7.456h-2c-.464 0-.928.032-1.392.096l-.432.048.336-.272c.368-.288.72-.592 1.056-.928l1.392-1.408-.768-.768-1.408 1.408c-.336.336-.64.688-.928 1.056l-.272.336.048-.432c.064-.464.096-.928.096-1.392v-2H7.552v4.256H3.296v1.088h2c.464 0 .928-.032 1.392-.096L7.12 8.4l-.336.272c-.368.288-.72.592-1.056.928L4.32 11.008l.768.768 1.408-1.408c.336-.336.64-.688.928-1.056l.272-.336-.048.432c-.064.464-.096.928-.096 1.392z" />
                    <path d="M9.712 9.616v.768l1.392 1.392.768-.768-1.392-1.392h-.768zM4.32 4.992l1.392 1.392h.768v-.768L5.088 4.224l-.768.768z" />
                    <path
                        fillRule="evenodd"
                        d="M1.328 0h13.344c.736 0 1.328.592 1.312 1.328v13.328c0 .736-.592 1.328-1.328 1.328H1.328A1.325 1.325 0 010 14.656V1.328C0 .592.592 0 1.328 0zm14.016 1.344a.676.676 0 00-.672-.672L1.328.656a.676.676 0 00-.672.672v13.344c0 .368.304.672.672.672h13.344a.676.676 0 00.672-.672V1.344z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
