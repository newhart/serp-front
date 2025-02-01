import colors from "vuetify/es5/util/colors";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - Bienvenue dans votre communauté professionnelle",
    title: "R23",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  target: "server",
  loading: {
    color: "#032153",
    height: "3px",
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/vuetifyCustoms.scss",
    "~/assets/container.css",
    "~/assets/global.scss",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/vue-select.js", mode: "client" },
    { src: "~/plugins/vue-picture-input.js", mode: "client" },
    { src: "~/plugins/infiniteloading", ssr: false },
    { src: "~/plugins/vue-draggable.js", mode: "client" },
    { src: "~/plugins/lightbox.js", mode: "client" },
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "@nuxtjs/svg",
    "@nuxtjs/moment",
    // [
    //   "@nuxtjs/laravel-echo",
    //   {
    //     auth: {
    //       headers: {
    //         Authorization: process.client
    //           ? localStorage.getItem("auth._token.local")
    //           : "18|LCqd07es6TJ2bg7Un0RlWPSZ8f2eHyJ0xUFe2Wzg",
    //       },
    //       method: "GET",
    //     },
    //     broadcaster: process.env.BROADCAST_DRIVER,
    //     key: process.env.PUSHER_APP_KEY,
    //     cluster: process.env.PUSHER_APP_CLUSTER,
    //     forceTLS: false,
    //     wsHost: "127.0.0.1",
    //     wsPort: 6001,
    //     wssPort: 6001,
    //     disableStats: true,
    //     encrypted: true,
    //     authEndpoint: process.env.PUSHER_AUTH_ENDPOINT,
    //   },
    // ],
  ],
  // echo: {
  //   authModule: true,
  //   connectOnLogin: true,
  //   plugins: [
  //     "~/plugins/echo.js",
  //     "~/plugins/infiniteloading.js",
  //     "~/plugins/vue-draggable.js",
  //     "~/plugins/vue-picture-input",
  //   ],
  // },

  moment: {
    locales: ["fr"],
    timezone: true,
  },

  pwa: {
    manifest: {
      name: "R23",
      short_name: "R23",
      lang: "fr",
      theme_color: "#222",
      background_color: "#222",
      start_url: `/`,
      prefer_related_applications: true,
    },
    icon: {
      fileName: "logo.png",
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    "@nuxtjs/toast",
    "@nuxtjs/proxy",
    "vue-scrollto/nuxt",
    "nuxt-sweetalert2",
    "@nuxtjs/dayjs",
  ],

  dayjs: {
    locales: ["fr"],
    defaultLocale: "fr",
    plugins: ["relativeTime", "advancedFormat"],
  },

  toast: {
    position: "top-center",
    register: [
      // Register custom toasts
      {
        name: "my-error",
        message: "Oops... une erreur est survenue",
        options: {
          type: "error",
          theme: "bubble",
          duration: 1000,
        },
      },
    ],
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      light: true,
      themes: {
        dark: {
          primary: "#032153",
          accent: "#6c757d",
          secondary: "#ff3354",
          info: "#0dcaf0",
          warning: "#fd7e14",
          error: "#ff3354",
          success: "#c3d830",
          light: "#000",
          white: "#fff",
        },
        light: {
          primary: "#032153",
          accent: "#6c757d",
          secondary: "#ff3354",
          info: "#0dcaf0",
          warning: "#fd7e14",
          error: "#ff3354",
          success: "#c3d830",
          light: "#fff",
          white: "#fff",
        },
      },
    },
  },
  axios: {
    baseURL: process.env.BASE_URL || "https://admin.r23mada.com",
    withCredentials: false,
    proxy: true,
    proxyHeaders: false,
    headers: {
      common: {
        Accept: "application/json, text/plain, */*",
      },
      delete: {},
      get: {},
      head: {},
      post: {},
      put: {},
      patch: {},
    },
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL,
    },
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL,
    },
  },

  proxy: [
    [
      "/api",
      {
        target: process.env.BASE_URL || "https://admin.r23mada.com",
        pathRewrite: {
          "^/api": "/",
        },
      },
    ],
  ],
  auth: {
    redirect: {
      login: "/",
      home: "/actualites",
      logout: "/",
    },
    cookie: {
      prefix: "",
      options: {
        path: "/",
      },
    },
    strategies: {
      laravelSanctum: {
        provider: "laravel/sanctum",
        url: process.env.BASE_URL,
        endpoints: {
          login: {
            url: "/api/confrimation-code",
          },
          user: {
            url: "api/user-profil",
            method: "get",
            propertyName: false, // <--- Default "user"
          },
          logout: { url: "/api/logout", method: "post" },
        },
      },
      local: {
        refreshToken: {
          property: "token",
          data: "token",
          maxAge: 525600,
        },
        user: {
          property: false, // <--- Default "user"
          autoFetch: true,
        },
        token: {
          property: "token",
          required: true,
          maxAge: 525600,
          global: true,
        },
        endpoints: {
          login: {
            url: "api/login",
            method: "post",
            propertyName: "token",
          },
          user: {
            url: "api/user-profil",
            method: "get",
            propertyName: false, // <--- Default "user"
          },
          logout: { url: "/api/logout", method: "post" },
        },
        rewriteRedirects: true,
        fullPathRedirect: true,
      },
    },
  },

  router: {
    middleware: ["auth"],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isClient }) {
      // Extend only webpack config for client-bundle
      if (isClient) {
        config.devtool = "source-map";
      }
    },
    transpile: ["defu"],
  },
};
