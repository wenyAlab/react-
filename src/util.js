export function getRedictPath({type, avatar}) {
    /**
     * 招聘者为 /employer   求职者为 /genius
     * 招聘者信息为 /employer   求职者为信息 /genius
     */
    let url = type === 'employer' ? '/employer' : '/genius';
    if (!avatar) {
        url += 'info'
    }
    return url;
}