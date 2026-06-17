# Gin UI Mods

Gin UI Mods is a custom Drupal 11 module for small interface tweaks in the Gin admin theme, including sidebar behavior, user-menu labeling, admin styling, login redirect behavior, user-form cleanup for Gin settings, a custom staff-form guidance message, and a sidebar dark-mode toggle that saves each user's preference.

## Features

- Opens the Gin sidebar by default on admin routes.
- Relabels user menu links for clearer account actions.
- Applies admin-side CSS tweaks for Gin toolbar, tables, markers, logo behavior, and the theme toggle UI.
- Adds a sidebar dark-mode toggle near logout.
- Persists the selected dark-mode setting per user through a custom POST route and controller.
- Redirects users to `/admin/mycontent` after login when no destination is provided.
- Limits Gin per-user settings on the user edit form to dark mode and accent-color options, while enabling user settings by default.
- Shows a staff profile best-practices warning on staff node add/edit forms.

## File structure

```text
gin_ui_mods/
├── gin_ui_mods.info.yml
├── gin_ui_mods.libraries.yml
├── gin_ui_mods.module
├── gin_ui_mods.routing.yml
├── src/
│   └── Controller/
│       └── GinThemeModeController.php
├── js/
│   ├── gin-relabel-usermenu.js
│   ├── gin-sidebar-default-open.js
│   └── gin-sidebar-theme-toggle.js
└── css/
    └── gin-admin.css
```

## Libraries

The module defines these libraries:

- `sidebar_default_open`
- `gin_admin`
- `user_menu_labels`
- `sidebar_theme_toggle`

These libraries are attached on admin routes by `gin_ui_mods_page_attachments()`.

## Theme mode route

The module provides a POST route at `/admin/gin-ui-mods/theme-mode/{mode}` where `mode` can be `0`, `1`, or `auto`. The route uses `GinThemeModeController::setMode()` to store the current user's Gin theme preference in `user.data`.

## Installation

1. Place the module in your Drupal codebase under `web/modules/custom/gin_ui_mods`.
2. Ensure the Gin admin theme is installed and used for the admin interface.
3. Install and configure the Drupal contrib module Gin Toolbar Custom Menu so the default Gin sidebar includes a logout link.
4. Enable the module:
   ```bash
   drush en gin_ui_mods
   ```
5. Clear caches:
   ```bash
   drush cr
   ```
6. Confirm the Gin sidebar shows the Dark mode link immediately before Logout.

## Notes

- This module assumes the Gin admin theme is active on admin pages.
- The CSS includes a logo override for `/sites/default/files/logohorigray.png` when the toolbar menu is open, so that asset path should exist if that branding behavior is desired.