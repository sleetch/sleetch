import type { parser } from '@/markdown/types/engine';

export const dummy: parser = async () => {
    return { type: 'html', html: '<p>Engine not integrated yet.</p>' };
};
