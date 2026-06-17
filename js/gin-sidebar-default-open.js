(function (Drupal, once) {
  Drupal.behaviors.ginUiModsSidebarDefaultOpen = {
    attach(context) {
      once('gin-ui-mods-sidebar-default-open', 'body', context).forEach(() => {
        const params = new URLSearchParams(window.location.search);
        const isInitialLogin = params.get('check_logged_in') === '1';

        if (!isInitialLogin) {
          return;
        }

        document.cookie = 'Drupal.toolbar.collapsed=0; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';

        let tries = 0;
        const maxTries = 20;

        const ensureExpanded = () => {
          const body = document.body;
          const trigger = document.querySelector('.toolbar-menu__trigger');
          const isOpen = body.dataset.toolbarMenu === 'open';

          if (!trigger) {
            if (tries++ < maxTries) {
              setTimeout(ensureExpanded, 150);
            }
            return;
          }

          if (!isOpen) {
            trigger.click();
          }
        };

        setTimeout(ensureExpanded, 150);
      });
    }
  };
})(Drupal, once);