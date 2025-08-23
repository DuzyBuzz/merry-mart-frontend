export class Users {
  constructor(
    public userId: string = '',
    public firstName: string = '',
    public lastName: string = '',
    public userName: string = '',
    public role: string = '',
    public position?: string,
    public password?: string
  ) {}
}
