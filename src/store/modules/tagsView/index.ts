import { IState, ITagsItem } from "./types";
import { defineStore } from "pinia";
import { GET_TAGS_LIST, GET_CURRENT_TAG, ADD_VISITED_VIEW_ACTION, SET_CURRENT_TAG_ACTION, DEL_VISITED_VIEW_ACTION } from "@/model";

export default defineStore("tagsView", {
  state: (): IState => ({
    tagsList: [
      {
        path: "/main",
        name: "Main",
        meta: {
          title: "首页",
          isClose: true
        }
      }
    ],
    currentTag: "/main"
  }),
  getters: {
    [GET_TAGS_LIST](): ITagsItem[] {
      return this.tagsList.map((item) => ({
        ...item,
        isClose: item.meta.isClose ?? false
      }));
    },
    [GET_CURRENT_TAG](): string {
      return this.currentTag;
    }
  },
  actions: {
    [ADD_VISITED_VIEW_ACTION](tag: ITagsItem) {
      const { path, name, meta } = tag;
      if (this.tagsList.some((item) => item.path === tag.path)) return;

      this.tagsList.push(
        Object.assign(
          {},
          { path, name, meta },
          {
            title: tag.meta.title || "no-name"
          }
        )
      );
    },
    [DEL_VISITED_VIEW_ACTION](tag: ITagsItem) {
      let index = this.tagsList.findIndex((item) => item.path === tag.path);
      this.tagsList.splice(index, 1);
      if (tag.path === this.currentTag) {
        return this.tagsList.at(-1);
      }
      return null;
    },
    [SET_CURRENT_TAG_ACTION](tag: ITagsItem) {
      this.currentTag = tag.path;
    }
  }
});
