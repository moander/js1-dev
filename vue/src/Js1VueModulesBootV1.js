import { sortBy, cloneDeep, isEqual, defaultsDeep } from '@moander/js1'

export default class Js1VueModulesBootV1 {
    constructor({ Modules }) {
        this.Modules = Modules;
        this.boot = this.boot.bind(this);
    }

    async boot(context) {
        const { app, router, store, Vue, ssrContext, urlPath, redirect } = context;

        vueProtoCommons(Vue);

        context.Modules = this.Modules;
        for (let fn of this.Modules.bootFunctions) {
            await fn(context);
        }

    }
}

function vueProtoCommons(Vue) {
    if (!Vue.prototype.$js1) {
        Vue.prototype.$js1 = {};
    }
    Object.assign(Vue.prototype.$js1, {
        sortBy,
        cloneDeep,
        isEqual,
        defaultsDeep,
        rmkeys(o, ...keys) {
            o = Object.assign({}, o);
            keys.forEach(k => delete o[k]);
            return o;
        },
        concat(...arrays) {
            return [].concat(...arrays);
        },
        patchRoute(changes) {
            let r = {};
            if (changes.path) r.path = path;
            if (changes.query) r.query = { ...this.$route.query, ...changes.query };
            if (changes.params) r.params = { ...this.$route.params, ...changes.params };
            this.$router.push(r);
        },
        log() {
            console.log.apply(console, arguments);
        },
        warn() {
            console.warn.apply(console, arguments);
        },
        error() {
            console.error.apply(console, arguments);
        },
    });

    Vue.prototype.$bindQS = function (queryName, defaultValue = '', { modelName, canPatchRoute } = {}) {
        modelName = modelName || queryName;
        this[modelName] = this.$route.query[queryName] || defaultValue;
        this.$watch(modelName, val => {
            if (!canPatchRoute || canPatchRoute()) {
                console.log('patchRoute');
                this.$patchRoute({ query: { [queryName]: val } })
            }
        });
        this.$watch(`$route.query.${queryName}`, val => this[modelName] = val || defaultValue);
    };
}