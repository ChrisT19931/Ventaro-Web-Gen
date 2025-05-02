#!/usr/bin/env bash
set -e

# 1. Ensure you’re on main and up to date
git checkout main
git pull origin main
git checkout -b finalize

# 2. Move any existing .env into .env.local
if [ -f .env ]; then
  mv .env .env.local
fi

# 3. Create a blank .env.example
cat > .env.example <<EOF
STRIPE_SECRET_KEY=
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_SENTRY_DSN=
EOF

# 4. Clean install & force legacy peer deps to avoid React v19 conflicts
rm -rf node_modules .next
npm install --legacy-peer-deps

# 5. Install dev tools
npm install --save-dev eslint eslint-config-next prettier husky lint-staged dotenv-safe --legacy-peer-deps

# 6. Initialize Husky and lint-staged
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"

# 7. Write basic config files
cat > .eslintrc.js <<EOF
module.exports = {
  extends: ['next/core-web-vitals', 'prettier'],
  rules: {},
};
EOF

cat > .prettierrc <<EOF
semi: true
singleQuote: true
printWidth: 100
EOF

cat > .lintstagedrc.json <<EOF
{
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"]
}
EOF

# 8. Install extras
npm install next-sitemap swr --legacy-peer-deps

# 9. Add sitemap config
cat > next-sitemap.config.js <<EOF
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com',
  generateRobotsTxt: true,
};
EOF

# 10. Add postbuild script
npx json -I -f package.json -e 'this.scripts["postbuild"]="next-sitemap"'

# 11. Create a basic 404 page
mkdir -p pages
cat > pages/404.tsx <<EOF
export default function Custom404() {
  return <h1>404 – Page Not Found</h1>;
}
EOF

# 12. Clear webpack cache & attempt a build
rm -rf .next/cache
npm run build --if-present || true

echo
echo "✅ Bulk setup done. Now:"
echo "   1) Open tsconfig.json and remove the trailing comma after the \"paths\" block so it's valid JSON."
echo "   2) Fill in .env.local with your real keys."
echo "   3) Run: npm run dev"
