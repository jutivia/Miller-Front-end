function number (num) {
  num = Number(num)
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function currency (num) {
  num = Number(num)
  return '₦' + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function dateTimestamp (timestamp) {
  const dateString = new Date(timestamp).toDateString()
  return dateString.replace(' ', ', ')
}

function chartDates (timestamps) {
  const dates = []
  for (const timestamp of timestamps) {
    const dateString = new Date(timestamp).toDateString()
    dates.push(dateString.replace(' ', ', ').slice(0, dateString.length - 4))
  }
  return dates
}

function dateRangeValid (fromDate, toDate) {
  const fromDateMilli = new Date(fromDate).getTime()
  const toDateMilli = new Date(toDate).getTime()
  return toDateMilli > fromDateMilli
}

function fullDateMethod (timestamp) {
  const dateString = new Date(timestamp).toDateString()
  // const timeString = new Date(timestamp).toLocaleTimeString()
  return `${dateString.replace(' ', ', ')}`
}

function numberToArrayMethod (numberParam) {
  numberParam = numberParam.toString()
  let formattedNumber = ''
  const arr = []
  if (numberParam.includes('/')) {
    formattedNumber = Number(numberParam.slice(1))
  }
  formattedNumber = Number(numberParam)
  for (let i = 1; i <= formattedNumber; i++) {
    arr.push(i)
  }

  return arr
}

function showDocumentName (doc) {
  if (Array.isArray(doc)) {
    const name = doc[0].split('-')
    return name[name.length - 1]
  } else {
    const name = doc.split('-')
    return name[name.length - 1]
  }
}

function showImageName (doc) {
  // console.log(doc)
  const name = doc.split('-')
  name.shift()
  return name.join('')
}

function showReadableAmounts (amount) {
  if (amount) {
    return '₦' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  } else {
    return 0.0
  }
}

function showReadableNumbers (amount) {
  if (amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  } else { return '0' }
}

function hideReadableAmountWithRef (amount, ref) {
  if (amount) {
    amount = parseInt(amount.split(',').join(''))
    this.$refs[ref].type = 'number'
  }
  return amount
}

function showReadableAmountWithRef (amount, ref) {
  if (amount) {
    amount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    this.$refs[ref].type = 'text'
  }
  return amount
}

function hideReadableAmountWithoutRef (amount) {
  if (amount) {
    amount = parseInt(amount.split(',').join(''))
  }
  return amount
}

function validateEmail (email) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(String(email).toLowerCase())
}

function showToast (message) {
  this.$toasted.error(message, {
    position: 'top-center',
    duration: 3000,
    class: 'toasting'
  })
}

function checkNum (num) {
  let check = false
  const regex1 = /^234[0-9]{10}$/
  const regex2 = /^[0-9]{11}$/
  if (regex1.test(num)) {
    check = true
  } else if (regex2.test(num)) {
    check = true
  }
  return check
}

function capitalize (str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''
}

function cutAddr (addr) {
  const starter = addr.slice(0, 4)
  const end = addr.slice(addr.length - 4)
  return `${starter}...${end}`
}
// hideReadableAmount (amount, ref) {
//   if (amount) {
//     const popped = amount
//       .split('')
//       .slice(1, amount.length)
//       .join('')
//     amount = parseInt(popped.split(',').join(''))
//     this.$refs[ref].type = 'number'
//   }
//   return amount
// },
// hideReadableAmountSubmit (amount) {
//   if (amount) {
//     const popped = amount
//       .split('')
//       .slice(1, amount.length)
//       .join('')
//     amount = parseInt(popped.split(',').join(''))
//   }
//   return amount
// },
// showReadableAmount (amount, ref) {
//   if (amount) {
//     amount = '₦ ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
//     this.$refs[ref].type = 'text'
//   }
//   return amount
// }

const functions = {
  formatNumber: number,
  formatCurrency: currency,
  formatTimestamp: dateTimestamp,
  formatChartDates: chartDates,
  validateDateRange: dateRangeValid,
  fullDate: fullDateMethod,
  numberToArray: numberToArrayMethod,
  showDocumentName,
  showReadableAmounts,
  showReadableNumbers,
  hideReadableAmountWithRef,
  showReadableAmountWithRef,
  hideReadableAmountWithoutRef,
  validateEmail,
  checkNum,
  showImageName,
  showToast,
  capitalize,
  cutAddr
}

export default functions
