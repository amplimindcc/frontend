/* eslint-disable @typescript-eslint/no-var-requires */
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Compile all SCSS files in their respective directories
 * @author David Linhardt
 *
 * @param {string} dir
 * @returns {void}
 */
function compileScssFile(dir) {
    fs.readdir(dir, (err, files) => {
        if (err) throw err;
        files.forEach((file) => {
            const filePath = path.join(dir, file);
            const fileStat = fs.statSync(filePath);
            if (fileStat.isDirectory()) {
                compileScssFile(filePath);
            } else if (path.extname(file) === '.scss') {
                const cssFilePath = filePath.replace('.scss', '.css');
                exec(
                    `sass ${filePath} ${cssFilePath}`,
                    (err, stdout, stderr) => {
                        if (err) {
                            console.error(
                                `Error compiling ${filePath}:`,
                                stderr
                            );
                            throw err;
                        } else {
                            console.log(
                                `Compiled ${filePath} to ${cssFilePath}`
                            );
                        }
                        console.log(stdout);
                    }
                );
            }
        });
    });
}

compileScssFile(path.join(__dirname, 'src'));
