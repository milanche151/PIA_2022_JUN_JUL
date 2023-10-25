import { User } from "./user";
export type Kasa = { tip: string, lokacija: string }
export type Magacin = { id: number, naziv: string }
export class Company{
    korisnik:User;
    telefon:string;
    mejl:string;
    naziv:string;
    adresa:string[];
    pib:string;
    maticnibroj:string;
    slika:string;
    status:string;
    kategorija:string;
    sif:string[];
    pdv:boolean;
    ziro:string[];
    magacini:number
    mag:Magacin[];
    kase:number
    kas:Kasa[];
    

}