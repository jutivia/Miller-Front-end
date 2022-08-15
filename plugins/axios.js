
export default function ({ $axios, store }) {
  $axios.onError((error) => {
    const parsedError = error.response ? error.response.data.msg : null
    if (parsedError.toLowerCase() === 'invalid or expired jwt') {
      window.location.pathname = '/'
      store.dispatch('newRoute', window.location.pathname)
    }
    if (
      parsedError.toLowerCase().includes('cannot read properties of null') ||
      parsedError.includes('network')
    ) {
      // console.log('Check your connection.')
    } else {
      // console.log(parsedError)
    }
    // console.log(parsedError)
    store.dispatch('dispatchError', parsedError)
  })

  $axios.onRequest((_config) => {
    // console.log(store.state.token)
    $axios.setHeader(
      'Authorization',
      `Bearer ${store.state.token}`
    )
  })
}
