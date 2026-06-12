<?php

namespace Drupal\gin_ui_mods\Plugin\Action;

use Drupal\Core\Session\AccountInterface;
use Drupal\node\NodeInterface;
use Drupal\views_bulk_operations\Action\ViewsBulkOperationsActionBase;

/**
 * Adds the current user to field_authorized_editors.
 *
 * @Action(
 *   id = "gin_ui_mods_add_current_user_to_authorized_editors",
 *   label = @Translation("Add me to authorized editors"),
 *   type = "node"
 * )
 */
class AddUserToAuthorizedEditors extends ViewsBulkOperationsActionBase {

  /**
   * {@inheritdoc}
   */
  public function access($object, AccountInterface $account = NULL, $return_as_object = FALSE) {
    return TRUE;
  }

  /**
   * {@inheritdoc}
   */
  public function execute($entity = NULL) {
    if (!$entity instanceof NodeInterface) {
      return;
    }

    if (!$entity->hasField('field_authorized_editors')) {
      return;
    }

    $user_id = \Drupal::currentUser()->id();
    if (empty($user_id)) {
      return;
    }

    $existing = $entity->get('field_authorized_editors')->getValue();

    foreach ($existing as $item) {
      if ((int) $item['target_id'] === (int) $user_id) {
        return;
      }
    }

    $existing[] = ['target_id' => (int) $user_id];
    $entity->set('field_authorized_editors', $existing);
    $entity->save();
  }

}