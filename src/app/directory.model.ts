// export class Directory {
//   constructor (public title: string, public artist: string, public album: string, public image: string) { }
// }


export interface Directory {
  $key?: string;
  title?: string;
  artist?: string;
  album?: string;
  image?: string; // this is like my url
}
