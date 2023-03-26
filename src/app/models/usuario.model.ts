export class Usuario {
  static fromFirebase(user: IUsuario) {
    return new Usuario(user.uid, user.email, user.nombre)
  }
  constructor(
    public uid: string,
    public email: string,
    public nombre: string
  ) { }

}

export interface IUsuario {
  uid: string;
  email: string;
  nombre: string;
}
