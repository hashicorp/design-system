import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPostgres24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M10.435 7.979c-.213-.03-.406-.002-.504.072a.185.185 0 00-.076.123c-.013.088.049.185.087.235.107.142.263.24.418.26a.475.475 0 00.067.005c.258 0 .492-.2.513-.35.026-.185-.244-.309-.505-.345zm7.06.006c-.02-.146-.28-.187-.526-.153-.245.034-.483.145-.463.29.015.114.22.308.463.308.02 0 .041-.001.062-.004a.598.598 0 00.337-.185c.086-.09.136-.19.127-.256z" />
                    <path d="M21.704 14.322c-.091-.275-.384-.364-.87-.263-1.444.298-1.96.091-2.13-.034 1.122-1.71 2.045-3.775 2.543-5.703.236-.913.366-1.761.377-2.453.012-.758-.118-1.316-.384-1.657-1.075-1.373-2.652-2.109-4.56-2.13-1.313-.014-2.422.322-2.637.416a6.573 6.573 0 00-1.483-.19c-.986-.016-1.837.22-2.542.7a11.347 11.347 0 00-2.066-.541C6.28 2.197 4.95 2.402 4 3.074c-1.132.802-1.655 2.236-1.554 4.262.034.682.423 2.778 1.035 4.786.807 2.643 1.684 4.14 2.607 4.447.108.036.232.061.37.061.336 0 .749-.151 1.178-.668a42.457 42.457 0 011.625-1.838c.362.195.76.304 1.168.315l.003.031c-.07.084-.139.169-.206.255-.282.359-.341.433-1.25.62-.259.054-.945.195-.955.676-.011.526.811.747.905.77.327.083.641.123.942.123.73 0 1.372-.24 1.885-.704-.016 1.875.062 3.722.287 4.285.185.461.635 1.587 2.058 1.587a3.3 3.3 0 00.691-.078c1.485-.319 2.13-.975 2.38-2.422.133-.773.362-2.62.47-3.61.227.07.52.103.836.103.66 0 1.422-.14 1.9-.362.536-.249 1.504-.86 1.329-1.391zm-3.536-6.693a6.016 6.016 0 01-.088.835 7.71 7.71 0 00-.106.98c-.011.364.034.742.078 1.108.089.74.18 1.5-.173 2.251a2.942 2.942 0 01-.156-.321c-.044-.106-.14-.277-.271-.514-.513-.92-1.715-3.074-1.1-3.954.184-.261.648-.53 1.816-.385zm-1.415-4.954c1.71.038 3.063.677 4.021 1.902.735.939-.074 5.21-2.416 8.896l-.071-.09-.03-.036c.605-1 .487-1.989.382-2.865-.043-.36-.084-.7-.074-1.02.01-.338.055-.628.099-.909.053-.345.107-.703.092-1.125a.464.464 0 00.01-.159c-.038-.404-.5-1.615-1.441-2.71a6.492 6.492 0 00-2.291-1.723 7.724 7.724 0 011.719-.161zm-9.571 12.91c-.473.568-.8.46-.907.424-.7-.234-1.512-1.713-2.228-4.06-.62-2.03-.982-4.07-1.01-4.643-.091-1.81.348-3.071 1.304-3.75 1.555-1.103 4.113-.442 5.14-.107l-.044.043C7.75 5.195 7.79 8.105 7.795 8.282c0 .07.005.167.013.3.03.49.083 1.4-.061 2.432a3.076 3.076 0 001.02 2.773c-.289.31-.917.993-1.585 1.798zm1.802-2.405a2.489 2.489 0 01-.652-2.084c.152-1.09.096-2.039.066-2.549l-.01-.183c.246-.218 1.388-.83 2.202-.643.372.085.598.338.692.773.487 2.253.065 3.192-.275 3.947-.07.155-.136.302-.192.454l-.044.118c-.111.297-.214.573-.278.835a2.102 2.102 0 01-1.509-.668zm.085 3.038a1.303 1.303 0 01-.394-.169c.072-.034.2-.08.42-.125 1.07-.22 1.235-.375 1.595-.833.083-.105.177-.224.306-.37.194-.216.282-.18.443-.113.13.054.256.217.308.396.024.085.051.245-.038.37-.753 1.055-1.851 1.042-2.64.844zm5.597 5.208c-1.309.28-1.772-.387-2.077-1.15-.197-.493-.294-2.714-.225-5.167a.298.298 0 00-.013-.094 1.219 1.219 0 00-.036-.173c-.102-.357-.351-.656-.65-.78-.119-.049-.336-.139-.598-.072.056-.23.152-.49.257-.77l.044-.12c.05-.132.112-.27.178-.417.355-.79.842-1.87.314-4.314C11.662 7.454 11 7.007 10 7.111c-.601.062-1.15.304-1.425.443a4.58 4.58 0 00-.163.087c.077-.922.366-2.645 1.447-3.735.68-.687 1.587-1.026 2.69-1.007 2.177.035 3.572 1.152 4.36 2.082.678.802 1.046 1.61 1.192 2.046-1.102-.112-1.852.105-2.233.649-.827 1.182.453 3.477 1.068 4.58.113.202.21.377.24.451.2.486.46.81.65 1.046.058.073.114.143.157.204-.334.097-.934.32-.88 1.431-.044.558-.357 3.17-.517 4.094-.21 1.22-.659 1.674-1.92 1.944zm5.46-6.248c-.342.158-.913.277-1.456.302-.6.029-.905-.067-.977-.125-.034-.693.224-.766.497-.842.043-.012.085-.024.125-.038.025.02.053.04.083.06.482.319 1.342.353 2.556.102l.013-.002a3.264 3.264 0 01-.841.543z" />
                </g>
            </svg>
        );
    }
);