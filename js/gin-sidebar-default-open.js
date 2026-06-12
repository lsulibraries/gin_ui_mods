(function (Drupal, once) {
  Drupal.behaviors.ginUiModsSidebarDefaultOpen = {
    attach(context) {
      once('gin-ui-mods-sidebar-default-open', 'body', context).forEach(() => {
        const body = document.body;

        const toggle = document.querySelector(
          '[data-drupal-selector="toolbar-icon-menu"], .toolbar-icon-menu, .gin-toolbar-toggle'
        );

        const isCollapsed =
          body.classList.contains('toolbar-vertical-collapsed') ||
          body.classList.contains('gin--navigation-collapsed') ||
          body.classList.contains('gin-sidebar-open') === false;

        if (toggle && isCollapsed) {
          window.requestAnimationFrame(() => {
            toggle.click();
          });
        }
      });
    }
  };
})(Drupal, once);