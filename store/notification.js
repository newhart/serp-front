export const state = () => ({
  notifications: [],
});

export const getters = {
  getNotification: (state) => state.notifications,
};

export const actions = {
  // TODO action
};

export const mutations = {
  CHANGENOTIFICATION(state, data) {
    state.notifications = data;
    state.notifications.forEach((notification) => {
      // add title if the type of the notification is a reservation
      if (notification.type.split("\\")[2] === "NotificationReservation") {
        notification.title = `<span class="font-bold">${notification.data.lastname} ${notification.data.name}</span> vient de faire une réservation`;
      }
      if (notification.type.split("\\")[2] === "UserPostedNotification") {
        notification.title = `<span class="font-bold">${notification.data.lastname} ${notification.data.name}</span> vient de publier. Découvrir maintenant.`;
      }
      if (notification.type.split("\\")[2] === "GroupPostNewNotification") {
        notification.title = `<span class="font-bold">${notification.data.lastname} ${notification.data.name}</span>  a publié dans ${notification.data.group_name}`;
      }
      if (notification.type.split("\\")[2] === "RegistredUserNotification") {
        notification.title = `<span class="font-bold">${notification.data.lastname} ${notification.data.name}</span> a créer un nouveau compte sur R23.`;
      }
      if (
        notification.type.split("\\")[2] === "RequestUserFriendsNotification"
      ) {
        notification.title = `<span class="font-bold">${notification.data.lastname} ${notification.data.name}</span> vous a envoyé une invitation. `;
      }
    });
  },
};
