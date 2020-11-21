import { Voce } from './voce.model';

export class Resturant{
    id: number;
    name: string;
    city: string;
    qrcode: string;
    menu: Voce[];
}