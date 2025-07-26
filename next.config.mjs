/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: true,
    images: {
        domains: ['127.0.0.1', 'localhost']
    },
};

export default nextConfig;
