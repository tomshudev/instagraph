export type User = {
  id: string;
  username: string;
  full_name: string;
  profile_pic_url: string;
};

export enum FollowType {
  FOLLOWER = "followers",
  FOLLOWING = "followings",
  NON_FOLLOWER = "non-follower"
}
