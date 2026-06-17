(function (Drupal, once) {
  Drupal.behaviors.ginUiSidebarThemeToggle = {
    attach(context) {
      once('gin-ui-sidebar-theme-toggle', '.toolbar-menu-administration', context).forEach((toolbar) => {
        const menu = toolbar.querySelector('ul.toolbar-menu');
        if (!menu) {
          return;
        }

        const logoutItem = menu.querySelector(
          'a.toolbar-icon-user-logout, a[href*="/user/logout"]'
        )?.closest('li.menu-item');

        if (!logoutItem) {
          return;
        }

        const existing = menu.querySelector('.gin-theme-toggle-item');
        if (existing) {
          return;
        }

        const li = document.createElement('li');
        li.className = 'menu-item gin-theme-toggle-item';

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'toolbar-icon toolbar-button--icon custom-toolbar-icon gin-theme-toggle';
        button.setAttribute('aria-label', 'Dark theme');

        const svgNS = 'http://www.w3.org/2000/svg';

        const icon = document.createElementNS(svgNS, 'svg');
        icon.setAttribute('xmlns', svgNS);
        icon.setAttribute('viewBox', '0 0 16 16');
        icon.setAttribute('width', '16');
        icon.setAttribute('height', '16');
        icon.setAttribute('fill', 'currentColor');
        icon.setAttribute('aria-hidden', 'true');
        icon.classList.add('bi', 'gin-theme-toggle-icon');

        const path = document.createElementNS(svgNS, 'path');
        icon.appendChild(path);

        button.appendChild(icon);
        button.appendChild(document.createTextNode('Dark mode'));

        const root = document.documentElement;

        const isDarkMode = () => root.classList.contains('gin--dark-mode');

        const syncState = () => {
          const isDark = isDarkMode();

          button.setAttribute('aria-pressed', isDark ? 'true' : 'false');
          button.setAttribute('aria-label', 'Dark mode');

          if (isDark) {
            icon.classList.remove('bi-toggle-off');
            icon.classList.add('bi-toggle-on');
            path.setAttribute('d', 'M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z');
          }
          else {
            icon.classList.remove('bi-toggle-on');
            icon.classList.add('bi-toggle-off');
            path.setAttribute('d', 'M11 4a4 4 0 0 1 0 8H8a5 5 0 0 0 2-4 5 5 0 0 0-2-4zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8M0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5');
          }
        };

        const applyMode = (mode) => {
          root.classList.toggle('gin--dark-mode', mode === '1');
          syncState();
        };

        button.addEventListener('click', async () => {
          const next = isDarkMode() ? '0' : '1';
          const previous = isDarkMode() ? '1' : '0';

          applyMode(next);

          try {
            const tokenResponse = await fetch('/session/token', {
              credentials: 'same-origin',
            });

            if (!tokenResponse.ok) {
              throw new Error(`Token HTTP ${tokenResponse.status}`);
            }

            const csrfToken = await tokenResponse.text();

            const response = await fetch(`/admin/gin-ui-mods/theme-mode/${next}`, {
              method: 'POST',
              credentials: 'same-origin',
              headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-Token': csrfToken,
              },
            });

            if (!response.ok) {
              throw new Error(`Save HTTP ${response.status}`);
            }
          }
          catch (error) {
            applyMode(previous);
            console.error('Unable to save Gin theme mode.', error);
          }
        });

        syncState();
        li.appendChild(button);
        menu.insertBefore(li, logoutItem);
      });
    },
  };
})(Drupal, once);