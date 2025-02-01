export const state = () => ({
  windowWidth: null,
  scrollCenter: 0,
  refreshPage: false,
  statusLanding: null,
  cover: null,
  picture: null,
});

export const getters = {
  getwindowWidth: (state) => state.windowWidth,
  getscrollCenter: (state) => state.scrollCenter,
  getrefreshPage: (state) => state.refreshPage,
  getstatusLanding: (state) => state.statusLanding,
  getcover: (state) => state.cover,
  getpicture: (state) => state.picture,
};

export const actions = {};

export const mutations = {
  changewindowWidth(state, data) {
    state.windowWidth = window.innerWidth;
  },
  changescrollCenter(state, data) {
    state.scrollCenter = document.getElementById("center-r23").scrollTop;
    if (state.scrollCenter > 500) {
      state.refreshPage = false;
    }
  },
  changerefreshPage(state, data) {
    state.refreshPage = data;
  },
  changestatusLanding(state, data) {
    state.statusLanding = data;
  },
  changecover(state, data) {
    state.cover = data;
  },
  changepicture(state, data) {
    state.picture = data;
  },
};
