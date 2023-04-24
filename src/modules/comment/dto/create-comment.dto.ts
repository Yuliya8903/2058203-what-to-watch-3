export default class CreateCommentDto {
  public rating!: number;
  public text!: string;
  public movieID!: string;
  public userID!: string;
  public favorites!: string[];
}
