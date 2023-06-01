export interface IState {
  tagsList: ITagsItem[];
  currentTag: string;
}

export interface ITagsItem {
  path: string;
  name: string;
  meta: {
    title: string;
    isClose: boolean;
  };
}
