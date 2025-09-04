#!/bin/bash
echo "🔄 Restoring Current Homepage..."
cp backup_current_homepage/HomePage_current.tsx client/src/pages/HomePage.tsx
cp backup_current_homepage/Navbar_current.tsx client/src/components/Navbar.tsx  
cp backup_current_homepage/index_current.css client/src/styles/index.css
cp backup_current_homepage/index_current.html client/index.html
echo "✅ Files restored! Now run: npm run build && restart workflow"
