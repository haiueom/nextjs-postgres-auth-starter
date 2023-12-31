/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    swcMinify: true,
    experimental: {
        serverComponentsExternalPackages: ['@tremor/react'],
    },
    images: {
        domains: ['avatars.githubusercontent.com', 'avatar.vercel.sh', "via.placeholder.com"],
    },
};

module.exports = nextConfig;
