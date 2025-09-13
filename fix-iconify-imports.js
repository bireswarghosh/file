const fs = require('fs');
const path = require('path');

function fixIconifyImports(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      fixIconifyImports(filePath);
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Fix the import path
      if (content.includes("@iconify/react/dist/iconify.js")) {
        content = content.replace(
          /import\s*{\s*Icon\s*}\s*from\s*['"]@iconify\/react\/dist\/iconify\.js['"];?/g,
          "import { Icon } from '@iconify/react';"
        );
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed: ${filePath}`);
      }
    }
  });
}

// Fix imports in src directory
fixIconifyImports('./src');
console.log('All Iconify imports fixed!');