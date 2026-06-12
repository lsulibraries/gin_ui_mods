# Gin UI Mods

Gin UI Mods is a custom Drupal 11 module that adds small interface tweaks for sites using the Gin admin theme.

## Features

- Opens the Gin sidebar by default when appropriate.
- Relabels user menu links to “View account” and “Edit account.”
- Adds admin-side CSS tweaks for selected Gin interface elements.
- Includes an action plugin that adds the current user to an entity’s `field_authorized_editors` field without creating duplicates.

## File structure

```text
gin_ui_mods/
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

## Installation

1. Place the module in your Drupal codebase under `web/modules/custom/gin_ui_mods`.
2. Enable the module:
   ```bash
   drush en gin_ui_mods
   ```
3. Clear caches:
   ```bash
   drush cr
   ```

## Notes

This module is designed around the Gin admin theme, so its UI behaviors and styling assume Gin is installed and active in the admin interface.