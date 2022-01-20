import { UIKit } from './@types/types';

// notice: we need to use the Figma file "key" values as identifiers
// because we can't use Figma file names (they may be changed by the users)

export const hdsUIKits: UIKit[] = [
    {
        id: 'hds_product_uikit--light',
        name: 'HDS - Product [Light]',
        theme: 'light',
        files: {
            foundations: 'oQsMzMMnynfPWpMEt91OpH',
            components: 'noyY6dUMDYjmySpHcMjhkN',
            icons: 'TLnoT5AYQfy3tZ0H68BgOr',
        },
    },
    {
        id: 'hds_product_uikit--dark',
        name: 'HDS - Product [Dark]',
        theme: 'dark',
        files: {
            foundations: 'SGNc5F05XkFndeRLugRDGR',
            components: 'noyY6dUMDYjmySpHcMjhkN',
            icons: 'TLnoT5AYQfy3tZ0H68BgOr',
        },
    },
];
