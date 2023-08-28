import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconDatastax24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M1 1h22v22H1V1zm1.719 10.13h1.553l.39.3v1.14l-.39.3H2.719v-1.74zm.3.3v1.14h1.342v-1.14H3.02zm3.303-.3h-.274l-1.005 1.74h.347l.795-1.376.794 1.376h.348l-1.005-1.74zm7.519.3v-.3h-1.437l-.39.3v.414l.39.301h1.252v.424h-1.564v.301h1.475l.39-.3v-.425l-.39-.3h-1.252v-.414h1.526zm-6.475-.3H9.31v.3h-.82v1.44h-.301v-1.44h-.822v-.3zm9.017 0H14.44v.3h.821v1.44h.3v-1.44h.822v-.3zm3.553.87l-.503-.87h-.347l.503.87-.503.87h.348l.502-.87zm.997-.87l-.502.87.502.87h.348l-.503-.87.503-.87h-.348zm-10.579 0h.274l1.005 1.74h-.347l-.795-1.376-.795 1.376H9.35l1.005-1.74zm7.348 0h-.274l-1.006 1.74h.348l.794-1.376.795 1.376h.348l-1.005-1.74z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
