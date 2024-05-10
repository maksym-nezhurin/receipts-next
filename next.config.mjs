/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                pathname: '**'
            },
            {
                protocol: 'https',
                hostname: 'static.vkusnyblog.com',
                pathname: '**'
            }
        ]
    },
};

export default nextConfig;
