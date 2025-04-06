import '@testing-library/jest-dom';
global.ResizeObserver = class ResizeObserver {
    constructor(cb) {
        this.cb = cb;
    }
    observe(target) {
                this.cb([{ contentRect: target.getBoundingClientRect(), target }], this);
    }
    unobserve(target) {
    }
    disconnect() {
    }
};