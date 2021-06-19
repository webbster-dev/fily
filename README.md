Fily is a file library/wrapper for use in NodeJS. Created to mitigate the amount of code a developer needs to write to store just a simple file. Works in combination with the [ExpressJS Framework](https://www.npmjs.com/package/express) and the [express-fileupload](https://www.npmjs.com/package/express-fileupload) package.

![Language](https://img.shields.io/github/languages/top/codesheep-dev/fily?style=for-the-badge)
![Dependencies](https://img.shields.io/david/codesheep-dev/fily?style=for-the-badge)
![Size](https://img.shields.io/bundlephobia/min/fily?style=for-the-badge)
![Downloads](https://img.shields.io/npm/dm/fily?style=for-the-badge)
![Issues](https://img.shields.io/github/issues/codesheep-dev/fily?style=for-the-badge)
![License](https://img.shields.io/github/license/codesheep-dev/fily?style=for-the-badge)
![Version](https://img.shields.io/npm/v/fily?style=for-the-badge)
![Node](https://img.shields.io/node/v/fily?style=for-the-badge)
![Commit](https://img.shields.io/github/last-commit/codesheep-dev/fily?style=for-the-badge)
## Installation

```bash
// With NPM
$ npm i fily

// With Yarn
$ yarn add fily
```

## CLI Installation

Fily comes with a CLI tool to quickly init a new configuration file.

```bash
// With NPM
$ npm i -g fily

// With Yarn
$ yarn global add fily
```

## CLI Usage

The Fily CLI has one command available.

```bash
Usage: fily [options] [command]

Options:
  -h, --help      display help for command

Commands:
  init            initialize a new boilerplate configuration file for Fily
  help [command]  display help for command
```

## Setup

To start using Fily, execute the following in a terminal:

```bash
$ fily init
```

This will add a new `fily.config.js` file in your current directory. Contents of the file:

```js
/**
 * Optionally you can use the "dotenv" package here to use ENV values in this configuration.
 */
require('dotenv').config();

/**
 * The configuration
 */
module.exports = {
  filesystems: {
    /**
     * The default disk to use, will be used if no disk is provided
     */
    default: 'local',

    /**
     * All of the disks. Available types are "local" and "ftp".
     */
    disks: [
      {
        // The driver, c.q. the name of this disk.
        driver: 'local',
        // The type of the disk, how it should store files.
        type: 'local',
        // The root directory where files will be placed.
        root: '/storage',
      },
      {
        driver: 'my-ftp-server',
        type: 'ftp',
        root: 'files',
        // The URL of the Ftp server.
        url: process.env.MY_FTP_SERVER_URL,
        // The user of the Ftp server.
        user: process.env.MY_FTP_SERVER_USER,
        // The password of the Ftp server.
        password: process.env.MY_FTP_SERVER_PASSWORD,
        // The port of the Ftp server.
        port: 443,
      },
    ],
  },
};
```

## Usage

Fily works with `disks`, inspired by the [Laravel Framework](https://laravel.com/).

Every disk has it's own configuration. This is handy if you have multiple places where you want to store files, for example a logo on an Ftp server but avatar uploads on your local filesystem. Also it makes things easy to configure and change, and keeps it in one place. A default disk can also be specified in `fily.config.js`.

Let's say you want to store files in a local folder `/uploads`. Your configuration file would then look like this:

```js
module.exports = {
  filesystems: {
    default: 'uploads',
    disks: [
      {
        driver: 'uploads',
        type: 'local',
        root: '/uploads',
      },
    ],
  },
};
```

Fily will use the `default` disk specified here if no explicit disk is provided.

Example usage in Express:

```js
const fily = require('fily');

router.post('/file', authorize, async (req, res) => {
  const { file } = req.files;

  // With async/await
  await fily.store(file);

  // With .then/.catch
  fily.store(file).then(() => {
    // Do stuff
  }).catch((error) => {
    // Do stuff with error
  });
});
```

Options can also be passed to the method.
```js
fily.store(file, {
    filename: 'my-file.pdf',
    driver: 'my-other-disk',
    useExpressFileUpload: true,
});
```

## Options
The following options are available:

| Option      | Description |
| ----------- | ----------- |
| `filename`    | Set an explicit filename for the file. |
| `driver`      | The driver to use. Should be specified in `fily.config.js`. |
| `useExpressFileUpload` | Set this to true if you're using the `express-fileupload` package. |

## Methods
The following methods are availble:
| Method | Description |
| ------ | ----------- |
| `store(file, options)` | Store a file.
| `update(file, options)` | Update a file. Filename should be the same.
| `destroy(file, options)` | Destroy or remove a file.

