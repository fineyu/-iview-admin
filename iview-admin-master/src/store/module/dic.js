import { GetCodeMainItems } from '@/api/dic'

export default {
  state: {
    dic: new Map(),
    hasGetDic: false
  },
  mutations: {
    setDic(state, dic) {
      state.dic = dic
    },
    setHasGetDic(state, hasGetDic) {
      state.hasGetDic = hasGetDic
    },
  },
  getters: {},
  actions: {
    getCodeMainItems({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          GetCodeMainItems().then(res => {
            const data = res.data.result;
            let dicHash = new Map();

            for (let index = 0; index < data.length; index++) {
              const element = data[index];
              let codeItemList = [];
              element.codeItems.forEach(item => codeItemList.push(Object.values(item)));
              console.log(codeItemList,"111");
              dicHash.set(element.codeName,new Map(codeItemList));
              console.log(dicHash,"2222");
            }
            commit('setDic', dicHash)
            commit('setHasGetDic', true)
            resolve(dicHash)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}
