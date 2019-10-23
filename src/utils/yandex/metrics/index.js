// @flow

export function hit() {
  if(window.ym) {
    window.ym(55883914, 'hit', document.location.pathname)
  }
}

export function ticketPay(amount: string | number) {
  if (window.ym) {
    window.ym(55883914, 'reachGoal', 'pay-ticket', {order_price: amount})
  }
}

export function ticketCreate() {
  if (window.ym) {
    window.ym(55883914, 'reachGoal', 'create-ticket')
  }
}