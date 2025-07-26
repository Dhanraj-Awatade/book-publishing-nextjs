#!/bin/sh
set -e

# Ensure Cloud Run has mounted the bucket at /mnt/productCloudStorage
if [ ! -d "/mnt/productCloudStorage" ]; then
    echo "Error: Cloud Storage mount point does not exist!"
    # exit 1
fi

# Ensure /app/dist exists
# mkdir -p /app/dist

# Create a symlink so your app can access it from /app/dist/products
ln -sfT /mnt/productCloudStorage /app/dist/products

echo "Cloud Storage bucket mounted at /app/dist/products"

# Start the Node.js app
exec "$@"
