export interface News {
  by: string;
  descendants: number;
  id: number;
  kids: Number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

export interface Comment {
  by: string;
  id: number;
  kids?: Number[];
  parent: number;
  text: string;
  time: number;
  type: string;
}

export interface CommentWithKids {
  by: string;
  id: number;
  kids?: CommentWithKids[];
  parent: number;
  text: string;
  time: number;
  type: string;
}
