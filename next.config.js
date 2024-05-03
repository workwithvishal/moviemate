/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**image.tmdb.org',
            },
            {
                protocol: 'https',
                hostname: '**img.youtube.com',
            },
        ],
        unoptimized: true,
    },
}

module.exports = nextConfig
