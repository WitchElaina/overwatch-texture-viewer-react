const app = angular.module('YepTextures', ['ui.bootstrap'])

app.config(function($sceProvider, $compileProvider, $locationProvider) {
  $locationProvider.hashPrefix('')
  if (!location.host.startsWith('localhost')) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    })
  }

  $sceProvider.enabled(false)
  $compileProvider.debugInfoEnabled(false) // more perf
})

app.controller('RootCtrl', ['$scope', '$http', '$location', '$filter', function($scope, $http, $location, $filter) {
  const vm = this
  this.loading = true
  this.loadError = false
  this.textures = []

  const DEFAULT_PAGE_SIZE = 1000

  const query = $location.search()
  this.searchText = query.q || ''
  this.pageSize = +query.pageSize || DEFAULT_PAGE_SIZE
  this.currentPage = +query.page || 1
  this.totalItems = 0
  this.isLargeImage = false

  this.onPageSizeChange = () => {
    $location.search('pageSize', this.pageSize === DEFAULT_PAGE_SIZE ? null : this.pageSize)
  }

  this.onSearchChange = () => {
    $location.search('q', this.searchText === '' ? null : this.searchText)
  }

  this.onPageChange = () => {
    $location.search('page', this.currentPage === 1 ? null : this.currentPage)
  }

  this.toggleImageSize = () => {
    this.isLargeImage = !this.isLargeImage
  }

  function copyToClipboard(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
    } else {
      const input = document.createElement('input')
      input.value = text
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
    }
  }

  this.clickItem = item => {
    copyToClipboard(item.id)
  }

  vm.$onInit = async () => {
    try {
      const response = await $http.get('https://assets.overwatchitemtracker.com/data/textures.json')

      vm.textures = response.data.map(x => {
        return {
          id: x,
          url: vm.getImageUrl(x)
        }
      })

      vm.totalItems = vm.textures.length
      console.log('Loaded textures', vm.textures)
    } catch (err) {
      console.error('Failed to load textures', err)
      vm.loadError = true
    } finally {
      vm.loading = false
      $scope.$applyAsync()
    }
  }

  this.getImageUrl = id => {
    return `https://assets.overwatchitemtracker.com/textures/${id}.png`
  }
}])

app.filter('start', function () {
  return function (input, start) {
    if (!input || !input.length) {
      return
    }

    start = +start
    return input.slice(start)
  }
})
