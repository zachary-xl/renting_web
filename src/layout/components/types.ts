import type { RouteRecordRaw } from "vue-router";

export interface ISubMenuProps {
  item: RouteRecordRaw;
}

export interface WheelEventCustom extends WheelEvent {
  wheelDelta: number;
  wheelDeltaY: number;
}
