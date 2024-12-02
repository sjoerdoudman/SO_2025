import { useRuntimeConfig } from 'nuxt/app';
import { defineStore } from 'pinia';
// @ts-ignore
import { useFetch } from '#app'; //ignoring because it's not recognized while it works
import type { Page, Specialization, showCase, Lesson, Year, Skill } from '@/types';

// Define a cache map to store fetched data
const cache = new Map();

// Cache expiration time in milliseconds (e.g., 1 hour)
const CACHE_EXPIRATION_TIME = 3600000;


interface StoreState {
    api: any;
    timeOut: number;
    pages: Page[];
    specializations: Specialization[];
    showCases: showCase[];
    lessons: Lesson[];
    years: Year[];
    skills: Skill[];
}

export const useCMSStore = defineStore({
    id: 'cms-store',
    state: (): StoreState => {
        const api = useRuntimeConfig().public.apiBase;
        return {
            api: api,
            timeOut: 5000,
            skills: [
                {
                    id: '1',
                    title: 'Unity',
                    slug: 'unity'
                }
            ],
            lessons: [
                {
                    title: 'Interactive Court',
                    image: null,
                    video_id: '367928872',
                    intro: 'Door middel van sensoren, LED-verlichting en projecties worden de bewegingen van spelers gevolgd, en kunnen visuele aanwijzingen worden gegeven tijdens het spel. Daarnaast kunnen spelers hun voortgang bijhouden via een bijbehorende mobiele app.',
                    slug: 'interactive-court',
                    year: [{ id: '1', title: 'Leerjaar 1', slug: '1' }],
                    specialization: [{ title: 'IM — Immersive Design', slug: 'immersive-design' }],
                    downloads: [{ title: 'Lesbrief', url: '/downloads/lesbrief_template.docx' }, { title: 'Presentatie', url: '/downloads/presentatie.pptx' }],
                    skill: [{ title: 'Unity', slug: 'unity' }, { title: 'Unreal Engine', slug: 'unreal-engine' }, { title: 'C#', slug: 'c-sharp' }, { title: 'C++', slug: 'c-plus-plus' }, { title: 'Arduino', slug: 'arduino' }]
                },
                {
                    title: 'Mission to Mars',
                    image: null,
                    video_id: '134075096',
                    intro: 'Door middel van sensoren, LED-verlichting en projecties worden de bewegingen van spelers gevolgd, en kunnen visuele aanwijzingen worden gegeven tijdens het spel. Daarnaast kunnen spelers hun voortgang bijhouden via een bijbehorende mobiele app.',
                    slug: 'mission-to-mars',
                    year: [{ id: '2', title: 'Leerjaar 2', slug: '2' }],
                    specialization: [{
                        title: 'IM — Immersive Design', slug: 'immersive-design'
                    }],
                    downloads: [{ title: 'Lesbrief', url: '/downloads/lesbrief_template.docx' }, { title: 'Presentatie', url: '/downloads/presentatie.pptx' }],
                    skill: [{ title: 'Unity', slug: 'unity' }, { title: 'Unreal Engine', slug: 'unreal-engine' }, { title: 'C#', slug: 'c-sharp' }, { title: 'C++', slug: 'c-plus-plus' }, { title: 'Arduino', slug: 'arduino' }]
                },
                {
                    title: 'Interactive Screen',
                    image: {
                        url: '/img/interactive-screen.png',
                        alt: 'Placeholder image'
                    },
                    video_id: '555182917',
                    intro: 'Door middel van sensoren, LED-verlichting en projecties worden de bewegingen van spelers gevolgd, en kunnen visuele aanwijzingen worden gegeven tijdens het spel. Daarnaast kunnen spelers hun voortgang bijhouden via een bijbehorende mobiele app.',
                    slug: 'interactive-screen',
                    year: [{ id: '1', title: 'Leerjaar 1', slug: '1' }],
                    downloads: [{ title: 'Lesbrief', url: '/downloads/lesbrief_template.docx' }, { title: 'Presentatie', url: '/downloads/presentatie.pptx' }],
                    specialization: [{ title: 'IM — Immersive Design', slug: 'immersive-design' }],
                    skill: [{ title: 'Unity', slug: 'unity' }, { title: 'Unreal Engine', slug: 'unreal-engine' }, { title: 'C#', slug: 'c-sharp' }, { title: 'C++', slug: 'c-plus-plus' }, { title: 'Arduino', slug: 'arduino' }]
                },
                {
                    title: 'MovieMaker',
                    image: {
                        url: '/img/moviemaker.png',
                        alt: 'Placeholder image'
                    },
                    video_id: '839483063',
                    intro: 'Door middel van sensoren, LED-verlichting en projecties worden de bewegingen van spelers gevolgd, en kunnen visuele aanwijzingen worden gegeven tijdens het spel. Daarnaast kunnen spelers hun voortgang bijhouden via een bijbehorende mobiele app.',
                    slug: 'moviemaker',
                    year: [{ id: '1', title: 'Leerjaar 1', slug: '1' }],
                    downloads: [{ title: 'Lesbrief', url: '/downloads/lesbrief_template.docx' }, { title: 'Presentatie', url: '/downloads/presentatie.pptx' }],
                    specialization: [{ title: 'IM — Immersive Design', slug: 'immersive-design' }],
                    skill: [{ title: 'Unity', slug: 'unity' }, { title: 'Unreal Engine', slug: 'unreal-engine' }, { title: 'C#', slug: 'c-sharp' }, { title: 'C++', slug: 'c-plus-plus' }, { title: 'Arduino', slug: 'arduino' }]
                },
                {
                    title: 'Custom Illustration',
                    image: {
                        url: '/img/custom-illustration.png',
                        alt: 'Placeholder image'
                    },
                    video_id: '48880375',
                    intro: 'Door middel van sensoren, LED-verlichting en projecties worden de bewegingen van spelers gevolgd, en kunnen visuele aanwijzingen worden gegeven tijdens het spel. Daarnaast kunnen spelers hun voortgang bijhouden via een bijbehorende mobiele app.',
                    slug: 'custom-illustration',
                    year: [{ id: '1', title: 'Leerjaar 1', slug: '1' }],
                    downloads: [{ title: 'Lesbrief', url: '/downloads/lesbrief_template.docx' }, { title: 'Presentatie', url: '/downloads/presentatie.pptx' }],
                    specialization: [{ title: 'AD — Applied Development', slug: 'applied-development' }],
                    skill: [{ title: 'Unity', slug: 'unity' }, { title: 'Unreal Engine', slug: 'unreal-engine' }, { title: 'C#', slug: 'c-sharp' }, { title: 'C++', slug: 'c-plus-plus' }, { title: 'Arduino', slug: 'arduino' }]
                },
                {
                    title: 'Bio Boost',
                    image: {
                        url: '/img/bio-boost.png',
                        alt: 'Placeholder image'
                    },
                    video_id: '703022660',
                    intro: 'Door middel van sensoren, LED-verlichting en projecties worden de bewegingen van spelers gevolgd, en kunnen visuele aanwijzingen worden gegeven tijdens het spel. Daarnaast kunnen spelers hun voortgang bijhouden via een bijbehorende mobiele app.',
                    slug: 'bio-boost',
                    year: [{ id: '1', title: 'Leerjaar 1', slug: '1' }],
                    downloads: [{ title: 'Lesbrief', url: '/downloads/lesbrief_template.docx' }, { title: 'Presentatie', url: '/downloads/presentatie.pptx' }],
                    specialization: [{ title: 'PD — Physical Digital', slug: 'physical-digital' }],
                    skill: [{ title: 'Unity', slug: 'unity' }, { title: 'Unreal Engine', slug: 'unreal-engine' }, { title: 'C#', slug: 'c-sharp' }, { title: 'C++', slug: 'c-plus-plus' }, { title: 'Arduino', slug: 'arduino' }]
                },
                {
                    title: 'Tegelwip Atlas',
                    image: {
                        url: '/img/tegelwip-atlas.png',
                        alt: 'Placeholder image'
                    },
                    video_id: '441426916',
                    intro: 'Door middel van sensoren, LED-verlichting en projecties worden de bewegingen van spelers gevolgd, en kunnen visuele aanwijzingen worden gegeven tijdens het spel. Daarnaast kunnen spelers hun voortgang bijhouden via een bijbehorende mobiele app.',
                    slug: 'tegelwip-atlas',
                    year: [{ id: '1', title: 'Leerjaar 1', slug: '1' }],
                    downloads: [{ title: 'Lesbrief', url: '/downloads/lesbrief_template.docx' }, { title: 'Presentatie', url: '/downloads/presentatie.pptx' }],
                    specialization: [{ title: 'DI — Digital Interaction', slug: 'digital-interaction' }],
                    skill: [{ title: 'Unity', slug: 'unity' }, { title: 'Unreal Engine', slug: 'unreal-engine' }, { title: 'C#', slug: 'c-sharp' }, { title: 'C++', slug: 'c-plus-plus' }, { title: 'Arduino', slug: 'arduino' }]
                },
                {
                    title: 'Schoenenkwartier Interactieve Bewegwijzering',
                    image: {
                        url: '/img/schoenenkwartier.jpeg',
                        alt: 'Placeholder image'
                    },
                    intro: 'Door middel van sensoren, LED-verlichting en projecties worden de bewegingen van spelers gevolgd, en kunnen visuele aanwijzingen worden gegeven tijdens het spel. Daarnaast kunnen spelers hun voortgang bijhouden via een bijbehorende mobiele app.',
                    slug: 'schoenenkwartier-interactieve-bewegwijzering',
                    year: [{ id: '1', title: 'Leerjaar 1', slug: '1' }],
                    downloads: [{ title: 'Lesbrief', url: '/downloads/lesbrief_template.docx' }, { title: 'Presentatie', url: '/downloads/presentatie.pptx' }],
                    specialization: [{ title: 'AD — Applied Development', slug: 'applied-development' }],
                    skill: [{ title: 'Unity', slug: 'unity' }, { title: 'Unreal Engine', slug: 'unreal-engine' }, { title: 'C#', slug: 'c-sharp' }, { title: 'C++', slug: 'c-plus-plus' }, { title: 'Arduino', slug: 'arduino' }]
                }
            ] as Lesson[],
            pages: [
                {
                    id: '1',
                    title: 'Home',
                    slug: 'home',
                    intro: 'This is the intro for Home',
                    hero: null
                },
                {
                    id: '2',
                    title: 'Creative Software Development',
                    slug: 'over',
                    intro: ' <p class="h4">De toekomst in App Ontwikkeling, meeslepende XR- en VR-ervaringen en Datavisualisaties</p><p>Een toekomstgerichte carrière om apps te ontwikkelen, meeslepende XR- en VR-ervaringen te creëren, data op een visueel aantrekkelijke manier te presenteren, en fysieke objecten te integreren met digitale technologieën.</p>',
                    hero: null,
                    modules: [
                        {
                            type: 'image_module',
                            item: {
                                title: 'Leerlijnen',
                                image: {
                                    id: '1',
                                    url: '/svg/schema.svg',
                                    alt: 'Placeholder image'
                                }
                            }
                        }, {
                            type: 'paragraphs_module',
                            item: {
                                paragraphs: [
                                    {
                                        type: 'text',
                                        content: '<h3 class="h4">Projectfasering</h3><p>Van grondig onderzoek tot de uiteindelijke implementatie en evaluatie, elke fase bouwt voort op de vorige om een succesvol eindresultaat te bereiken. Elk project doorloopt de volgende 5 fases:</p>'
                                    },
                                    {
                                        type: 'accordeon',
                                        listItems: [
                                            {
                                                title: 'Onderzoek',
                                                content: 'In deze fase doe je onderzoek naar de doelgroep, de context en de technische mogelijkheden.'
                                            },
                                            {
                                                title: 'Prototyping',
                                                content: 'Na het afronden van het onderzoek is het tijd om te beginnen met het creëren van prototypes. In deze fase moet je minimaal X concepten en ideeën uitwerken en testen om te bepalen welke het meest geschikt is voor het project.'
                                            },
                                            {
                                                title: 'Ontwerp',
                                                content: 'In deze fase ontwerp je de interface en de interactie.'
                                            },
                                            {
                                                title: 'Implementatie',
                                                content: 'In deze fase ontwikkel je de applicatie.'
                                            },
                                            {
                                                title: 'Evaluatie',
                                                content: 'In deze fase evalueer je de applicatie en stel je verbeteringen voor.'
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    id: '3',
                    title: 'Templates',
                    slug: 'templates',
                    intro: '',
                    hero: null,
                    modules: [
                        {
                            type: 'paragraphs_module',
                            item: {
                                paragraphs: [
                                    {
                                        type: 'text',
                                        content: '<h2 class="h3">Lesbrief</h3><p>Deze template ondersteunt bij het formuleren van duidelijke opdrachten, doelen en verwachtingen, waardoor studenten effectief begeleid kunnen worden tijdens hun leerproces.</p>'
                                    },
                                    {
                                        type: 'downloads',
                                        listItems: [
                                            {
                                                title: 'Lesbrief template (leeg)',
                                                url: '/downloads/lesbrief_template.docx'
                                            },
                                            {
                                                title: 'Docentenhandleiding template (leeg)',
                                                url: '/downloads/lesbrief_template.docx'
                                            }
                                        ]
                                    }
                                ]
                            }
                        },
                        {
                            type: 'paragraphs_module',
                            item: {
                                paragraphs: [
                                    {
                                        type: 'text',
                                        content: '<h2 class="h3">Presentatie</h3><p>Gebruik de presentatie-template om de lessen visueel sterk en georganiseerd te presenteren. Deze PowerPoint-template helpt je om je inhoud gestructureerd over te brengen, met focus op doelen, doelgroep en fasering, voor optimale betrokkenheid van de studenten.</p>'
                                    },
                                    {
                                        type: 'downloads',
                                        listItems: [
                                            {
                                                title: 'Presentatie template (leeg)',
                                                url: '/downloads/lesbrief_template.docx'
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
            showCases: [
                {
                    id: '1',
                    author: 'Lars van Dijk',
                    title: 'The Larsinator 2000',
                    slug: 'lars-van-dijk',
                    live: false,
                    intro: 'This is the intro for Showcase 1',
                    years: [{
                        id: '1',
                        title: 'Leerjaar 1',
                        slug: '1',
                    }],
                    image: {
                        url: '/img/lars-groot.png',
                        alt: 'Placeholder image'
                    },
                    thumbnail: {
                        url: '/img/lars.png',
                        alt: 'Placeholder image'
                    },
                    lesson: {
                        title: 'Tegelwip Atlas',
                        image: {
                            url: '/img/tegelwip-atlas.png',
                            alt: 'Placeholder image'
                        },
                        video_id: '441426916',
                        intro: 'Door middel van sensoren, LED-verlichting en projecties worden de bewegingen van spelers gevolgd, en kunnen visuele aanwijzingen worden gegeven tijdens het spel. Daarnaast kunnen spelers hun voortgang bijhouden via een bijbehorende mobiele app.',
                        slug: 'tegelwip-atlas',
                        year: [{ id: '1', title: 'Leerjaar 1', slug: '1' }],
                        downloads: [{ title: 'Lesbrief', url: '/downloads/lesbrief_template.docx' }, { title: 'Presentatie', url: '/downloads/presentatie.pptx' }],
                        specialization: [{ title: 'DI — Digital Interaction', slug: 'digital-interaction' }],
                        skill: [{ title: 'Unity', slug: 'unity' }, { title: 'Unreal Engine', slug: 'unreal-engine' }, { title: 'C#', slug: 'c-sharp' }, { title: 'C++', slug: 'c-plus-plus' }, { title: 'Arduino', slug: 'arduino' }]
                    }
                },
                {
                    id: '2',
                    author: 'Sanne de Vries',
                    title: 'Self portrait',
                    slug: 'sanne-de-vries',
                    live: false,
                    intro: 'This is the intro for Showcase 1',
                    years: [{
                        id: '1',
                        title: 'Leerjaar 1',
                        slug: '1',
                    }],
                    image: {
                        url: '/img/sanne-groot.png',
                        alt: 'Placeholder image'
                    },
                    thumbnail: {
                        url: '/img/sanne.png',
                        alt: 'Placeholder image'
                    },
                    lesson: {
                        title: 'Schoenenkwartier Interactieve Bewegwijzering',
                        image: {
                            url: '/img/schoenenkwartier.jpeg',
                            alt: 'Placeholder image'
                        },
                        intro: 'Door middel van sensoren, LED-verlichting en projecties worden de bewegingen van spelers gevolgd, en kunnen visuele aanwijzingen worden gegeven tijdens het spel. Daarnaast kunnen spelers hun voortgang bijhouden via een bijbehorende mobiele app.',
                        slug: 'schoenenkwartier-interactieve-bewegwijzering',
                        year: [{ id: '1', title: 'Leerjaar 1', slug: '1' }],
                        downloads: [{ title: 'Lesbrief', url: '/downloads/lesbrief_template.docx' }, { title: 'Presentatie', url: '/downloads/presentatie.pptx' }],
                        specialization: [{ title: 'AD — Applied Development', slug: 'applied-development' }],
                        skill: [{ title: 'Unity', slug: 'unity' }, { title: 'Unreal Engine', slug: 'unreal-engine' }, { title: 'C#', slug: 'c-sharp' }, { title: 'C++', slug: 'c-plus-plus' }, { title: 'Arduino', slug: 'arduino' }]
                    }
                },
                {
                    id: '3',
                    author: 'Jeroen Bakker',
                    title: 'Arduiono Heaven',
                    slug: 'jeroen-bakker',
                    live: true,
                    intro: 'The making of "2 Player Unvirtual Landscape" ; a sitespecific minigolf playground with interactive lighttrail & moving objects. At industrial monument "Mengfabriek de Heus Koudijs" sHertogenbosch - organised by Rezone Playful Interventions. ',
                    years: [{
                        id: '1',
                        title: 'Leerjaar 1',
                        slug: '1',
                    }],
                    video_id: '76479685',
                    image: {
                        url: '/img/jeroen-groot.png',
                        alt: 'Placeholder image'
                    },
                    thumbnail: {
                        url: '/img/jeroen.png',
                        alt: 'Placeholder image'
                    },
                    modules: [
                        {
                            type: 'paragraphs_module',
                            item: {
                                paragraphs: [
                                    {
                                        type: 'downloads',
                                        listItems: [
                                            {
                                                title: 'Presentatie template (leeg)',
                                                url: '/downloads/lesbrief_template.docx'
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    ],
                    lesson: {
                        title: 'Bio Boost',
                        image: {
                            url: '/img/bio-boost.png',
                            alt: 'Placeholder image'
                        },
                        video_id: '703022660',
                        intro: 'Door middel van sensoren, LED-verlichting en projecties worden de bewegingen van spelers gevolgd, en kunnen visuele aanwijzingen worden gegeven tijdens het spel. Daarnaast kunnen spelers hun voortgang bijhouden via een bijbehorende mobiele app.',
                        slug: 'bio-boost',
                        year: [{ id: '1', title: 'Leerjaar 1', slug: '1' }],
                        downloads: [{ title: 'Lesbrief', url: '/downloads/lesbrief_template.docx' }, { title: 'Presentatie', url: '/downloads/presentatie.pptx' }],
                        specialization: [{ title: 'PD — Physical Digital', slug: 'physical-digital' }],
                        skill: [{ title: 'Unity', slug: 'unity' }, { title: 'Unreal Engine', slug: 'unreal-engine' }, { title: 'C#', slug: 'c-sharp' }, { title: 'C++', slug: 'c-plus-plus' }, { title: 'Arduino', slug: 'arduino' }]
                    },
                },
                {
                    id: '4',
                    author: 'Youssef El Amrani',
                    title: 'Iets echt fabeltastisch',
                    slug: 'youssef-el-amrani',
                    live: true,
                    intro: 'This is the intro for Showcase 1',
                    years: [{
                        id: '1',
                        title: 'Leerjaar 1',
                        slug: '1',
                    }],
                    image: {
                        url: '/img/youssef-groot.png',
                        alt: 'Placeholder image'
                    },
                    thumbnail: {
                        url: '/img/youssef.png',
                        alt: 'Placeholder image'
                    },
                    lesson: {
                        title: 'Mission to Mars',
                        image: null,
                        video_id: '134075096',
                        intro: 'Door middel van sensoren, LED-verlichting en projecties worden de bewegingen van spelers gevolgd, en kunnen visuele aanwijzingen worden gegeven tijdens het spel. Daarnaast kunnen spelers hun voortgang bijhouden via een bijbehorende mobiele app.',
                        slug: 'mission-to-mars',
                        year: [{ id: '2', title: 'Leerjaar 2', slug: '2' }],
                        specialization: [{
                            title: 'IM — Immersive Design', slug: 'immersive-design'
                        }],
                        downloads: [{ title: 'Lesbrief', url: '/downloads/lesbrief_template.docx' }, { title: 'Presentatie', url: '/downloads/presentatie.pptx' }],
                        skill: [{ title: 'Unity', slug: 'unity' }, { title: 'Unreal Engine', slug: 'unreal-engine' }, { title: 'C#', slug: 'c-sharp' }, { title: 'C++', slug: 'c-plus-plus' }, { title: 'Arduino', slug: 'arduino' }]
                    }
                },
                {
                    id: '5',
                    author: 'Leila Bouhadi',
                    title: 'Green fields',
                    slug: 'leila-bouhadi',
                    live: true,
                    intro: 'This is the intro for Showcase 1',
                    years: [{
                        id: '1',
                        title: 'Leerjaar 1',
                        slug: '1',
                    }],
                    image: {
                        url: '/img/leila-groot.png',
                        alt: 'Placeholder image'
                    },
                    thumbnail: {
                        url: '/img/leila.png',
                        alt: 'Placeholder image'
                    },
                    lesson: {
                        title: 'Interactive Court',
                        image: null,
                        video_id: '367928872',
                        intro: 'Door middel van sensoren, LED-verlichting en projecties worden de bewegingen van spelers gevolgd, en kunnen visuele aanwijzingen worden gegeven tijdens het spel. Daarnaast kunnen spelers hun voortgang bijhouden via een bijbehorende mobiele app.',
                        slug: 'interactive-court',
                        year: [{ id: '1', title: 'Leerjaar 1', slug: '1' }],
                        specialization: [{ title: 'IM — Immersive Design', slug: 'immersive-design' }],
                        downloads: [{ title: 'Lesbrief', url: '/downloads/lesbrief_template.docx' }, { title: 'Presentatie', url: '/downloads/presentatie.pptx' }],
                        skill: [{ title: 'Unity', slug: 'unity' }, { title: 'Unreal Engine', slug: 'unreal-engine' }, { title: 'C#', slug: 'c-sharp' }, { title: 'C++', slug: 'c-plus-plus' }, { title: 'Arduino', slug: 'arduino' }]
                    }
                }
            ] as showCase[],
            years: [
                {
                    id: '1',
                    title: 'Leerjaar 1',
                    slug: '1',
                },
                {
                    id: '2',
                    title: 'Leerjaar 2',
                    slug: '2',
                },
                {
                    id: '3',
                    title: 'GLRXTRA',
                    slug: 'glrxtra',
                },
            ],
            specializations: [
                {
                    id: '1',
                    title: 'IM — Immersive Design',
                    slug: 'immersive-design',
                    subtitle: 'Ontwikkelen van meeslepende virtuele ervaringen',
                    image: {
                        url: '/img/im.png',
                        alt: 'Placeholder image'
                    }
                },
                {
                    id: '2',
                    title: 'AD — Applied Development',
                    slug: 'applied-development',
                    subtitle: 'Het ontwikkelen van software om praktische problemen op te lossen',
                    image: {
                        url: '/img/ad.png',
                        alt: 'Placeholder image'
                    }
                },
                {
                    id: '3',
                    title: 'PD — Physical digital',
                    slug: 'physical-digital',
                    subtitle: 'Aansturen van fysieke objecten voor interactieve toepassingen',
                    image: {
                        url: '/img/pd.png',
                        alt: 'Placeholder image'
                    }
                },
                {
                    id: '4',
                    title: 'DI — Digital interaction',
                    slug: 'digital-interaction',
                    subtitle: 'Ordenen & visualiseren van data voor interactieve toepassingen',
                    image: {
                        url: '/img/di.png',
                        alt: 'Placeholder image'
                    }
                }
            ]
        }
    },
    actions: {
        async fetchPages(params: object) {
            // const url = `${this.api}/collections/pages/entries?fields=id,title,slug,image,video_id,url,permalink,api_url,intro,rows,general,contacts,socials,address,seo_title,seo_description,og_data`;
            // await this.fetchListWithCache('pages', url)
        },

        // Cache handling methods
        async fetchListWithCache(listKey: keyof StoreState, url: string) {
            // console.log(listKey);
            // console.log(this[listKey] + 'and' + this[listKey].length);
            const { data }: any = await useFetch(url, {
                timeout: this.timeOut
            });
            if (data.value) {
                this[listKey] = data.value.data;
                // this.setCache(url, this[listKey]);
            }
            return;


            if (this[listKey] == undefined || this[listKey].length === 0) {
                const cachedData = this.getCache(url);
                if (cachedData) {
                    this[listKey] = cachedData;
                } else {
                    // console.log(url);
                    try {
                        const { data }: any = await useFetch(url, {
                            timeout: this.timeOut
                        });
                        if (data.value) {
                            this[listKey] = data.value.data;
                            this.setCache(url, this[listKey]);
                        }
                    } catch (error) {
                        console.error('Error fetching data:', error);
                    }
                }
            }
        },
        setCache(key: string, value: Page[]) {
            cache.set(key, { value, timestamp: Date.now() });
        },
        getCache(key: string) {
            const cached = cache.get(key);
            if (cached) {
                const isExpired = (Date.now() - cached.timestamp) > CACHE_EXPIRATION_TIME;
                if (!isExpired) {
                    return cached.value;
                } else {
                    cache.delete(key);
                }
            }
            return null;
        },
        clearExpiredCache() {
            const now = Date.now();
            cache.forEach((value, key) => {
                if ((now - value.timestamp) > CACHE_EXPIRATION_TIME) {
                    cache.delete(key);
                }
            });
        }
    }
})