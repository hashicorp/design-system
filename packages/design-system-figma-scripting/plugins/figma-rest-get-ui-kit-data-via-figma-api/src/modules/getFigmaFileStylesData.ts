import * as Figma from 'figma-api';
import { figmaToken } from '../../../_figmaToken';

import { pick } from 'lodash';

import { FigmaFile, UIKitStylesData } from '../../../@types/types';

const api = new Figma.Api({
    personalAccessToken: figmaToken,
});

export async function getFigmaFileStylesData(file: FigmaFile['figmaKey']) {
    const stylesData: UIKitStylesData = {};

    const fileStyles = await api.getFileStyles(file);

    fileStyles.meta?.styles.forEach((entry) => {
        stylesData[entry.key] = pick(entry, ['key', 'file_key', 'node_id', 'style_type', 'name']);
    });

    return stylesData;
}
