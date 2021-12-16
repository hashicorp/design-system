import fs from 'fs-extra';
import archiver from 'archiver';

import { ConfigData } from '../@types/ConfigData';

export async function zipSVGFolder({ config } : { config: ConfigData }): Promise<void> {

    const srcFolderPath = `${config.mainFolder}/svg`;
    const zipFilePath = `${config.emberPublicFolder}/flight-icons-svg.zip`;

    // remove the previous version of the ZIP file
    try {
        await fs.remove(zipFilePath)
    } catch (err) {
        console.error(err);
    }

    return new Promise<void>((resolve, reject) => {

        // zip the content of the src directory (notice: if "parentFolder" is set to false, the archiver will not create a "root" parent folder)
        const zipArchiver = archiver('zip', { zlib: { level: 9 } });
        zipArchiver.directory(srcFolderPath, 'flight-icons-svg');

        // handle warnings and errors
        zipArchiver.on('warning', function (err) {
            if (err.code === 'ENOENT') {
                console.log('an error occurred', err, err.code);
            } else {
                reject(err);
            }
        });

        zipArchiver.on('error', function (err) {
            reject(err);
        });

        // create a file to stream archive data to
        const outputStream = fs.createWriteStream(zipFilePath);

        // on completion of the stream writing
        outputStream.on('close', function () {
            resolve();
        });

        // pipe stream data to the file
        zipArchiver.pipe(outputStream);

        // finalize the archive
        zipArchiver.finalize();
    });
}
