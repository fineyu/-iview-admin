const signalR = require("@aspnet/signalr");
import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro


export default {
    state: {
        connection: null,
        hasConnected: false
    },
    mutations: {
        setConnection(state, connection) {
            state.connection = connection;
        },
        sethasConnected(state, hasConnected) {
            state.hasConnected = hasConnected;
        }
    },
    getters: {},
    actions: {
        connect({ state, commit }) {
            return new Promise(async (resolve, reject) => {
                try {
                    let connection = new signalR.HubConnectionBuilder()
                        .withUrl(`${baseUrl}/messagebus`)
                        .build();

                    await connection.start();
                    console.log("signalR is connected!");
                    commit('setConnection', connection);
                    commit('sethasConnected', true);
                    resolve(connection);
                } catch (error) {
                    reject(error);
                }
            });
        }
    }
}