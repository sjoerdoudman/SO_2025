import { defineNuxtPlugin, useServerSeoMeta } from 'nuxt/app';
export default defineNuxtPlugin((nuxtApp) => {
    interface Page {
        title: string
        seo_title: string,
        seo_description: string,
        og_data: {
            title: string,
            description: string,
            image: string
        }
    }

    const getTranslatedMeta = (page: Page) => {
        console.log(page.seo_title);
        return useServerSeoMeta({
            title: () => page.seo_title !== null ? `${page.seo_title} - Plomp` : `${page.title} - Plomp`,
            ogTitle: () => page.og_data?.title !== null ? page.og_data.title : `${page.title} - Plomp`,
            twitterTitle: () => page.og_data?.title !== null ? `${page.seo_title} - Plomp` : page.og_data.title,
            description: () => page.seo_description !== null ? page.seo_description : '',
            ogDescription: () => page.og_data?.description !== null ? page.og_data.description : '',
            twitterDescription: () => page.og_data?.description !== null ? page.og_data.description : '',
            ogImage: () => page.og_data?.image !== undefined ? page.og_data?.image : '',
            ogImageUrl: () => page.og_data?.image !== undefined ? page.og_data?.image : '',
            twitterImage: () => page.og_data?.image !== undefined ? page.og_data?.image : '',
        });
    }

    return {
        provide: {
            meta: getTranslatedMeta
        }
    }
});
