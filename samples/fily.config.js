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
     * All of the disks. Available types are "local", "ftp" and "s3".
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
        host: process.env.MY_FTP_SERVER_URL,
        // The user of the Ftp server.
        user: process.env.MY_FTP_SERVER_USER,
        // The password of the Ftp server.
        password: process.env.MY_FTP_SERVER_PASSWORD,
        // The port of the Ftp server.
        port: 443,
      },
      {
        driver: 'aws-s3',
        type: 's3',
        // The key for AWS S3. You can omit this if you've already got ENV value AWS_ACCESS_KEY_ID set.
        key: process.env.AWS_KEY,
        // The secret for AWS S3. You can omit this if you've already got ENV value AWS_SECRET_ACCESS_KEY set.
        secret: process.env.AWS_SECRET,
        // The region for AWS S3.
        region: process.env.AWS_REGION,
        // The bucket for AWS S3.
        bucket: process.env.AWS_BUCKET,
      },
    ],
  },
};