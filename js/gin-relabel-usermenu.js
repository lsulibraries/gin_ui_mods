(function (Drupal, once) {
  Drupal.behaviors.ginUiModsUserMenuLabels = {
    attach(context) {
      once('gin-ui-mods-user-menu-account-link', '.toolbar-tab.user-menu .account a', context).forEach((link) => {
        link.textContent = 'View account';
      });

      once('gin-ui-mods-user-menu-account-edit-link', '.toolbar-tab.user-menu .account-edit a', context).forEach((link) => {
        link.textContent = 'Edit account';
      });
    }
  };
})(Drupal, once);