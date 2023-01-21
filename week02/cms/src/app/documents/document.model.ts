export class Contact {
  public id: string;
  public name: string;
  public desc: string;
  public url: string;
  public children: object;

  constructor (id: string, name: string, desc: string, url: string, children: object) {
    this.id= id;
    this.name= name;
    this.desc= desc;
    this.url= url;
    this.children= children;
  }
}