import { Items } from './items.model';
import { Store } from './store.model';

export class OrderFullData{
    id: number;
    createdAt: string;
    store: Store;
    note: string;
    items: Items[];

    

}