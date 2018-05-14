export class Upload {
  $key: string;
  title?: string;
  artist?: string;
  album?: string;
  file: File;
  image: string;
  progress: number;
  createdOn: Date = new Date();

  constructor(file: File) {
      this.file = file;
  }
}
