import Vue from 'vue'

import Toasted from 'vue-toasted'

const toast = {
  position: 'top-right',
  register: [
    {
      name: 'success',
      message: message => message,
      options: {
        type: 'success',
        theme: 'bubble',
        duration: 3000,
        className: 'toast-container',
        action: {
          icon: 'close',
          onClick: (e, toastObject) => {
            toastObject.goAway(0)
          }
        }
      }
    },
    {
      name: 'error',
      message: message => message,
      options: {
        type: 'error',
        theme: 'bubble',
        duration: 3000,
        className: 'toast-container',
        action: {
          icon: 'close',
          onClick: (e, toastObject) => {
            toastObject.goAway(0)
          }
        }
      }
    }
  ]
}
if (process.browser) {
  Vue.use(Toasted, toast)
}
