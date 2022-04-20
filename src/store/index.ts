import { atom } from 'recoil';
import key from './key';
export const cataLogState = atom<any[]>({
    key: key.cataLogKey,
    default: [],
});

export const recommendArticleState = atom<any[]>({
    key: key.recommendList,
    default: [],
});
