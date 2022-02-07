import { ICardProps } from '../../Card/types/index.d';

interface ICardFooterProps {
    id:string;
    description?:string;
    temp_min?:number;
    temp_max?:number;
    match?:boolean;
    matchIsVisible?:boolean;
}

export { ICardFooterProps };