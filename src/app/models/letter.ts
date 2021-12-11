import {LetterType} from './letter.type';

export interface Letter {
    label: string;
    type: LetterType;
    color: string;
    timing: number;
    isDead: boolean;
    hide: boolean;
}
