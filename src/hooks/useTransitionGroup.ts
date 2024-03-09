const useTransitionGroup = (dely = 0.02, totle = 0, type = 1) => {
    const onEnter = (e: Element) => {
        const el = e as HTMLDivElement;
        const index = parseInt(el.dataset.index || '0');
        const transitiondelay = `${index * dely}s`;
        if (type === 2) el.style.animationDelay = transitiondelay;
        if (type === 1) el.style.transitionDelay = transitiondelay;
    };
    const onLeave = (e: Element) => {
        const el = e as HTMLDivElement;
        const index = parseInt(el.dataset.index || '0');
        const transitiondelay = `${(totle - index) * dely}s`;
        if (type === 2) el.style.animationDelay = transitiondelay;
        if (type === 1) el.style.transitionDelay = transitiondelay;
    };
    const onClear = (e: Event) => {
        const el = e.target as HTMLDivElement;
        el.style.animationDelay = '0s';
        el.style.transitionDelay = '0s';
    };
    return {
        onEnter,
        onLeave,
        onClear
    }
};

export default useTransitionGroup;