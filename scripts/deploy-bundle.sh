#!/bin/bash

# Define names
BUNDLE_DIR="deploy-package"
ZIP_NAME="deployment.zip"

# Clean up previous runs
rm -rf $BUNDLE_DIR
rm -f $ZIP_NAME

# Create directory structure
mkdir -p $BUNDLE_DIR
mkdir -p $BUNDLE_DIR/.next

# 1. Copy Standalone Core (EXCLUDING node_modules for CloudLinux)
echo "Copying standalone core files..."
# Copy everything except node_modules (and exclude package-lock.json to avoid platform mismatches)
rsync -av --exclude='node_modules' --exclude='package-lock.json' .next/standalone/ $BUNDLE_DIR/

# Generate production-only package.json (no devDependencies)
echo "Generating minimal package.json..."
node -e "const pkg=require('./.next/standalone/package.json'); delete pkg.devDependencies; require('fs').writeFileSync('$BUNDLE_DIR/package.json', JSON.stringify(pkg, null, 2))"

# NOTE: We use the generated *production* package.json now. 
# This removes 'prisma' CLI, 'typescript', and 'eslint' from the install process,
# saving massive amounts of memory and preventing OOM crashes on shared hosting.
# We still EXCLUDE package-lock.json to force fresh resolution.

# 2. Copy Static Assets (CSS/JS) - Critical!
echo "Copying static assets..."
cp -R .next/static $BUNDLE_DIR/.next/

# 3. Copy Public Assets (Images)
echo "Copying public folder..."
cp -R public $BUNDLE_DIR/

# 4. Copy Pre-generated Prisma Client (Linux Binaries)
echo "Copying pre-generated Prisma Client..."
mkdir -p $BUNDLE_DIR/_pregenerated_prisma
cp -R node_modules/.prisma/client/* $BUNDLE_DIR/_pregenerated_prisma/

# 5. Copy Offline Node Modules (Full Bypass of npm install)
echo "Copying offline node_modules..."
rsync -av .next/standalone/node_modules/ $BUNDLE_DIR/_offline_modules/

# AGGRESSIVE CLEANUP: Remove ANY Mac/Windows specific folders to prevent Core Dumps
echo "Removing architecture-specific binaries..."
find $BUNDLE_DIR/_offline_modules -type d -name "*darwin*" -exec rm -rf {} +
find $BUNDLE_DIR/_offline_modules -type d -name "*win32*" -exec rm -rf {} +
find $BUNDLE_DIR/_offline_modules -type d -name "*windows*" -exec rm -rf {} +

# SUPER CRITICAL: Remove ALL .node, .dylib, and .so native binaries.
echo "Removing all native binaries from offline modules..."
find $BUNDLE_DIR/_offline_modules -name "*.node" -delete
find $BUNDLE_DIR/_offline_modules -name "*.dylib" -delete
find $BUNDLE_DIR/_offline_modules -name "*.so" -delete

# Specifically target known offenders (just in case)
rm -rf $BUNDLE_DIR/_offline_modules/sharp
rm -rf $BUNDLE_DIR/_offline_modules/@next/swc-* 

# NOTE: We keep @libsql/linux-* if present, but since we are on Mac they likely aren't there.
# Only @libsql/client is critical. If it fails to find a binary, it typically throws an error, not core dump.
# The previous Core Dump was likely due to trying to load a Mac dylib on Linux.
# With these removed, it should be safe.

# 4. Create Zip File
echo "Zipping everything into $ZIP_NAME..."
cd $BUNDLE_DIR
# Zip hidden files and normal files
zip -r ../$ZIP_NAME .
cd ..

# Cleanup
rm -rf $BUNDLE_DIR

echo "✅ Success! Upload '$ZIP_NAME' to your control panel."
