import request from '../request';
import { ResponseType } from '../responseTypes';

type SuggestionParams = {
    wd: string;
    p?: number;
    ie?: string;
    cb?: string;
}
export type SuggestionResponse = {
    p: boolean;
    q: string;
    s: string[];
}
/** 
 * Suggestion
 */
export const Suggestion = (params: SuggestionParams): Promise<ResponseType<SuggestionResponse>> => request({
    url: '//suggestion.baidu.com/su',
    method: 'get',
    type: 'jsonp',
}, params);