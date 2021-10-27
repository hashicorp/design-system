import { SVGAttributes } from 'react';

interface BaseIconProps extends SVGAttributes<SVGElement> {
    children?: never;
    color?: string;
}

interface IconPropsWithTitle extends BaseIconProps {
    title: string;
    titleId: string;
}

export type IconProps = BaseIconProps & IconPropsWithTitle;
