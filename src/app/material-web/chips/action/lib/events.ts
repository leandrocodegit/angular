/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/** Events emitted by the action. */
export enum Md3ChipActionEventType {
  DELETE = 'chip-action-delete',
  SELECT = 'chip-action-select',
  NAVIGATE_TO_PREV = 'chip-action-navigate-to-prev',
  NAVIGATE_TO_NEXT = 'chip-action-navigate-to-next',
  NAVIGATE_TO_FIRST = 'chip-action-navigate-to-first',
  NAVIGATE_TO_LAST = 'chip-action-navigate-to-last',
}
