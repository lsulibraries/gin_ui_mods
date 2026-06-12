# Gin UI Mods

Gin UI Mods is a custom Drupal module for Drupal 11 that adds small interface tweaks for sites using the Gin admin theme.[file:1] The module currently ships front-end assets for sidebar behavior, user menu relabeling, and admin-side styling adjustments through three defined libraries.[file:2]

## Overview

The module is declared as a custom Drupal module named **Gin UI Mods** with a core version requirement of `^11` and a description of “Small UI tweaks for the Gin admin theme.”[file:1] Its library definitions show that the module bundles one admin CSS library and two JavaScript behavior libraries that depend on Drupal behaviors and `once` where needed.[file:2]

## Included tweaks

- **Sidebar default open:** A Drupal behavior checks whether the Gin sidebar appears collapsed and programmatically triggers the toolbar toggle so the sidebar opens by default.[file:5]
- **User menu relabeling:** The module relabels user menu links so the account links read “View account” and “Edit account.”[file:4]
- **Admin theme CSS changes:** The stylesheet adds striped table rows, hides the first overview link under toolbar sections, adjusts submenu icon spacing, styles custom view header summary and add-button elements, and swaps toolbar logo presentation based on whether the menu is open.[file:6]
- **Authorized editors action:** The included `AddUserToAuthorizedEditors` PHP class adds the current user to the `field_authorized_editors` field on an entity, avoids duplicates, and saves the entity after updating the field.[file:3]

## File structure

```text
Gin UI Mods/
├── gin_ui_mods.info.yml
├── gin_ui_mods.libraries.yml
├── src/
│   └── Plugin/
│       └── Action/
│           └── AddUserToAuthorizedEditors.php
├── js/
│   ├── gin-relabel-usermenu.js
│   └── gin-sidebar-default-open.js
└── css/
    └── gin-admin.css
```

The module structure includes metadata, library definitions, JavaScript behaviors, CSS overrides, and a PHP action class under `src/Plugin/Action`.[file:1][file:2][file:3][file:4][file:5][file:6]

## Installation

1. Place the module in your Drupal codebase under `web/modules/custom/gin_ui_mods` or the equivalent custom modules directory for your project.
2. Make sure the Gin admin theme is installed and in use where these UI changes are expected, because the module is designed around Gin admin markup and behavior.[file:1][file:4][file:5][file:6]
3. Enable the module with Drush (`drush en gin_ui_mods`) or through Drupal’s Extend page.
4. Clear caches after enabling so the module’s libraries and theme-layer changes are rebuilt.
