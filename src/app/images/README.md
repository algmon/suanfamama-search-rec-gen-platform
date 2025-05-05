# Image Assets Structure

This directory contains all image assets for the fashion platform.

## Directory Structure

```
images/
├── categories/          # Category-specific images
│   ├── tops/           # Top clothing items
│   ├── bottoms/        # Bottom clothing items
│   ├── dresses/        # Dresses
│   └── accessories/    # Accessories
├── products/           # Individual product images
│   ├── tops/
│   ├── bottoms/
│   ├── dresses/
│   └── accessories/
├── ui/                 # UI elements and icons
│   ├── icons/
│   ├── logos/
│   └── backgrounds/
└── temp/              # Temporary or placeholder images
```

## Image Guidelines

1. **Product Images**:
   - Format: JPG or PNG
   - Size: 800x1200px (portrait) or 1200x800px (landscape)
   - Background: White or transparent
   - Multiple angles for each product

2. **Category Images**:
   - Format: JPG or PNG
   - Size: 600x400px
   - Should represent the category well

3. **UI Images**:
   - Format: SVG (preferred) or PNG
   - Size: Varies based on use case
   - Should be optimized for web

## Naming Convention

1. **Product Images**:
   - Format: `category_product-id_variant.jpg`
   - Example: `tops_001_front.jpg`, `tops_001_back.jpg`

2. **Category Images**:
   - Format: `category_name.jpg`
   - Example: `tops_classic.jpg`, `bottoms_jeans.jpg`

3. **UI Images**:
   - Format: `purpose_name.svg`
   - Example: `icon_search.svg`, `logo_main.svg` 