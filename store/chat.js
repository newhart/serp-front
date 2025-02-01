export const state = () => ({
    discussionActiveFloatant: [],
    discussioninPage: null,
    countmessagenotsee: 0,
    newCooperative: null,
});

export const getters = {
    getdiscussionActiveFloatant: state => state.discussionActiveFloatant,
    getdiscussioninPage: state => state.discussioninPage,
    getcountmessagenotsee: state => state.countmessagenotsee,
    getnewCooperative: state => state.newCooperative
}

export const actions = {

    // get_token_to_id(context, data = null, id) {

    // },
}

export const mutations = {
    changediscussionActiveFloatant(state, data) {
        let Array = [];
        state.discussionActiveFloatant.forEach(element => {
            Array.push(element.target_user.id)
        });
        if (!Array.includes(data.target_user.id)) {
            state.discussionActiveFloatant.push(data)
        }
        if (state.discussionActiveFloatant.length > 5) {
            state.discussionActiveFloatant.shift();
        }
    },
    changediscussioninPage(state, data) {
        state.discussioninPage = data;
    },
    changenewCooperative(state, data) {
        state.newCooperative = data;
    },
    deletediscussionActiveFloatant(state, data) {
        state.discussionActiveFloatant.splice(data, 1);
    },
    changecountmessagenotsee(state, data) {
        state.countmessagenotsee = state.discussioninPage + data;
    },
}