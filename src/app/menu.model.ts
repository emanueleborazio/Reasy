import { Voce } from './voce.model';

export class Menu{
    id: number;
    name: string;
    price: number;
    menu: Voce[];
    enabled: boolean;
}