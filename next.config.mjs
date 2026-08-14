/** @type {import('next').NextConfig} */
const nextConfig = {
  // better-sqlite3 es nativo; docx y jspdf se usan solo en el servidor (Node).
  serverExternalPackages: ['better-sqlite3', 'docx', 'jspdf'],
  eslint: {
    // La verificación principal es `npm run build` (tsc). Sin lint en build.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
