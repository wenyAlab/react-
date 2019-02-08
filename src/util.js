export function getRedictPath({type, avatar}) {
    /**
     * 招聘者为 /boss   求职者为 /bossinfo
     * 招聘者信息为 /genius   求职者为信息 /geniusinfo
     */
    let url = type === 'boss' ? '/boss' : '/genius';
    if (!avatar) {
        url += 'info'
    }
    return url;
}

export function getChatId (userId, targetId) {
    return [userId, targetId].sort().join('_');
}