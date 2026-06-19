(function (Drupal, once) {
  Drupal.behaviors.ginUiFlagReviewIcon = {
    attach(context) {
      once('gin-ui-flag-review-icon', 'td.views-field-link-flag a.use-ajax', context).forEach((link) => {
        link.classList.add('review-toggle-link');
      });
    },
  };
})(Drupal, once);