<?php

namespace Drupal\gin_ui_mods\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Session\AccountProxyInterface;
use Drupal\user\UserDataInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * Saves the current user's Gin theme mode preference.
 */
class GinThemeModeController extends ControllerBase {

  /**
   * The current user service.
   */
  protected AccountProxyInterface $currentUserAccount;

  /**
   * The user.data service.
   */
  protected UserDataInterface $userData;

  /**
   * Constructs the controller.
   */
  public function __construct(AccountProxyInterface $current_user, UserDataInterface $user_data) {
    $this->currentUserAccount = $current_user;
    $this->userData = $user_data;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container): static {
    return new static(
      $container->get('current_user'),
      $container->get('user.data')
    );
  }

  /**
   * Persists the selected Gin theme mode for the current user.
   */
  public function setMode(string $mode, Request $request): JsonResponse {
    $allowed_modes = ['0', '1', 'auto'];

    if (!in_array($mode, $allowed_modes, TRUE)) {
      return new JsonResponse([
        'status' => 'error',
        'message' => 'Invalid mode.',
      ], 400);
    }

    $uid = (int) $this->currentUserAccount->id();

    if ($uid <= 0) {
      return new JsonResponse([
        'status' => 'error',
        'message' => 'Anonymous users are not supported.',
      ], 403);
    }

    $gin_data = $this->userData->get('gin', $uid) ?? [];
    $settings = $gin_data['settings'] ?? [];

    $settings['enable_darkmode'] = $mode;

    $this->userData->set('gin', $uid, 'settings', $settings);
    $this->userData->set('gin', $uid, 'enable_user_settings', '1');

    return new JsonResponse([
      'status' => 'ok',
      'uid' => $uid,
      'mode' => $mode,
      'settings' => $settings,
    ]);
  }

}