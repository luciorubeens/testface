module.exports = {
  register () {
    this.routes = [
      {
        path: '/change-now',
        name: 'change-now',
        component: 'MainPage'
      },
      {
        path: '/stepper',
        name: 'stepper',
        component: 'StepperPage'
      }
    ]

    this.menuItems = [
      {
        routeName: 'change-now',
        title: 'ChangeNOW'
      }
    ]
  },
  getComponentPaths () {
    return this.routes.reduce((all, route) => {
      return {
        ...all,
        [route.component]: `pages/${route.component}.js`
      }
    }, {})
  },

  getRoutes () {
    return this.routes
  },

  getMenuItems () {
    return this.menuItems
  }
}
