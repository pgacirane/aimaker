# 1. Create the React + Vite project
npm create vite@latest qomexis-web -- --template react

# 2. Enter the project directory
cd qomexis-web

# 3. Install dependencies
npm install
npm install -D tailwindcss postcss autoprefixer
npm install lucide-react framer-motion
npx tailwindcss init -p

# 4. Create the folder structure (Windows specific)
New-Item -ItemType Directory -Force -Path src/components, public/assets

# 5. Create the component files
$files = "Navbar.jsx", "Hero.jsx", "Section.jsx", "AfricaMapSection.jsx", "Footer.jsx"
foreach ($file in $files) {
    New-Item -ItemType File -Path "src/components/$file" -Force
}

Write-Host "Project structure created successfully! Now copy your code into the files." -ForegroundColor Cyan