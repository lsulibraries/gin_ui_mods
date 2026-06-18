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

        const findExistingDarkModeItem = () => {
          return Array.from(menu.querySelectorAll('li.menu-item')).find((item) => {
            const text = item.textContent.replace(/\s+/g, ' ').trim();
            return text === 'Dark mode';
          });
        };

        let li = menu.querySelector('.gin-theme-toggle-item') || findExistingDarkModeItem();
        let button = li?.querySelector('button.gin-theme-toggle');

        if (!li) {
          li = document.createElement('li');
          li.className = 'menu-item';
          menu.insertBefore(li, logoutItem);
        }

        li.classList.add('gin-theme-toggle-item', 'menu-item');

        if (!button) {
          li.textContent = '';

          button = document.createElement('button');
          button.type = 'button';
          button.className = 'toolbar-icon toolbar-button--icon custom-toolbar-icon gin-theme-toggle';
          button.setAttribute('aria-label', 'Dark mode');

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
          li.appendChild(button);
        }

        const icon = button.querySelector('.gin-theme-toggle-icon');
        const path = icon?.querySelector('path');
        const root = document.documentElement;

        if (!icon || !path) {
          return;
        }

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

        if (!button.dataset.ginThemeToggleBound) {
          button.dataset.ginThemeToggleBound = 'true';

          button.addEventListener('click', async () => {
            const next = isDarkMode() ? '0' : '1';
            const previous = isDarkMode() ? '1' : '0';

            root.classList.toggle('gin--dark-mode', next === '1');
            syncState();

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
              root.classList.toggle('gin--dark-mode', previous === '1');
              syncState();
              console.error('Unable to save Gin theme mode.', error);
            }
          });
        }

        syncState();
      });
    },
  };
})(Drupal, once);