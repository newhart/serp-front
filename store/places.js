export const state = () => ({
  places: [],
});

export const mutations = {
  CHANGE_TYPE_PLACE(state, data) {
    state.places = [];
    for (let i = 1; i <= data + 1; i++) {
      state.places.push({
        numero: i === 1 ? i : i - 1,
        statusPlace: i - 1 === 0 ? "chauffeur" : "libre",
      });
    }
  },
  CHANGE_PLACE_SUPEROR_16(state, data) {
    state.places = [];
    state.places = [
      {
        numero: 1,
        statusPlace: "chauffeur",
      },
      {
        numero: 0,
        statusPlace: "vide",
      },
      {
        numero: 1,
        statusPlace: "libre",
      },
      {
        numero: 2,
        statusPlace: "libre",
      },
      {
        numero: 3,
        statusPlace: "libre",
      },
      {
        numero: 4,
        statusPlace: "libre",
      },
      {
        numero: 5,
        statusPlace: "libre",
      },
      {
        numero: 6,
        statusPlace: "libre",
      },
      {
        numero: 7,
        statusPlace: "libre",
      },
      {
        numero: 8,
        statusPlace: "libre",
      },
      {
        numero: 0,
        statusPlace: "vide",
      },
      {
        numero: 9,
        statusPlace: "libre",
      },
      {
        numero: 10,
        statusPlace: "libre",
      },
      {
        numero: 11,
        statusPlace: "libre",
      },
      {
        numero: 0,
        statusPlace: "vide",
      },
      {
        numero: 12,
        statusPlace: "libre",
      },
      {
        numero: 13,
        statusPlace: "libre",
      },
      {
        numero: 14,
        statusPlace: "libre",
      },
      {
        numero: 15,
        statusPlace: "libre",
      },
      {
        numero: 16,
        statusPlace: "libre",
      },
    ];
  },
  CHANGE_PLACE_EUQUALS_18(state, data) {
    state.places = [];
    state.places = [
      {
        numero: 1,
        statusPlace: "chauffeur",
      },
      {
        numero: 0,
        statusPlace: "vide",
      },
      {
        numero: 1,
        statusPlace: "libre",
      },
      {
        numero: 2,
        statusPlace: "libre",
      },
      {
        numero: 3,
        statusPlace: "libre",
      },
      {
        numero: 4,
        statusPlace: "libre",
      },
      {
        numero: 5,
        statusPlace: "libre",
      },
      {
        numero: 6,
        statusPlace: "libre",
      },
      {
        numero: 7,
        statusPlace: "libre",
      },
      {
        numero: 8,
        statusPlace: "libre",
      },
      {
        numero: 9,
        statusPlace: "libre",
      },
      {
        numero: 10,
        statusPlace: "libre",
      },
      {
        numero: 11,
        statusPlace: "libre",
      },
      {
        numero: 12,
        statusPlace: "libre",
      },
      {
        numero: 13,
        statusPlace: "libre",
      },
      {
        numero: 14,
        statusPlace: "libre",
      },
      {
        numero: 15,
        statusPlace: "libre",
      },
      {
        numero: 16,
        statusPlace: "libre",
      },
      {
        numero: 17,
        statusPlace: "libre",
      },
      {
        numero: 18,
        statusPlace: "libre",
      },
    ];
  },
};
