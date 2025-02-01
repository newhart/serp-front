export const state = () => ({
    depart: null,
});

export const getters = {
    getdepart: state => state.depart,
}

export const actions = {

    // get_token_to_id(context, data = null, id) {

    // },
}

export const mutations = {
    changedepart(state, data) {
        state.depart = data
    },
}