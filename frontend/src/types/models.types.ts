export type User = {
  _id: string;
  username: string;
  displayName: string;
};

export type CreateUserPayload = {
  username: string;
  displayName: string;
};

export type Post = {
  _id: string;
  userId: string;
  name: string;
  text: string;
  media?: string;
  likes?: number;
  createdAt?: string;
};

export type CreatePostPayload = {
  userId: string;
  name: string;
  text: string;
  media?: string;
};

export type UpdatePostPayload = Partial<
  Pick<Post, 'name' | 'text' | 'media'>
>;