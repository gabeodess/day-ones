export default {
  beginningOfDayLocal: () => new Date(new Date(new Date().setHours(0, 0, 0, 0)).toString().split('GMT')[0])
}