/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com', // Chef Icon
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Profile Pic
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc', // Kanban Order User Avatars
      },
    ],
  },
};

export default nextConfig;