let items = [
  { poster: "terminator.jpg" },
  { poster: "pulpfiction.jpg" },
  { poster: "scarface.jpg" },
  { poster: "ghostbusters.jpg" },
  { poster: "goonies.jpg" },
  { poster: "terminator.jpg" },
  { poster: "pulpfiction.jpg" },
  { poster: "scarface.jpg" },
  { poster: "ghostbusters.jpg" },
  { poster: "goonies.jpg" },
]

const depth = 10
const itemWidth = 365
const animSpeed = 1550
let animTimer
let activeIndex = 0

// javascript implementation

document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".ex-carousel")

  render()

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      switch (mutation.type) {
        case "attributes":
          //console.log("mutation:", mutation)
          if (carousel.classList.contains("ex-carousel--animating")) {
            render()
          }
          if (carousel.classList.contains("ex-carousel--rendering")) {
            render()
            reflow() // prevent transition during render
            carousel.classList.remove("ex-carousel--rendering")
          }
          break
        case "childList":
          break
      }
    }
  })

  observer.observe(carousel, {
    attributes: true,
    childList: true,
    subtree: false,
  })

  function render() {
    // iterate through all items, create dom & assign position
    const l = items.length

    // first loop sets immediate positioning
    items.forEach((item, i) => {
      const zIndex = l - i
      const x = activeIndex * -itemWidth
      const z = (i - activeIndex) * -depth

      item.z = z
      item.x = x
      item.zIndex = zIndex

      const translateZ = `translateZ(${item.z}px)`

      if (!item.element) {
        item.enter = true
        const element = document.createElement("div")
        element.classList.add("ex-carousel__item")
        //element.setAttribute("tabindex", i)
        const poster = document.createElement("div")
        poster.classList.add("ex-carousel__poster")
        poster.style.backgroundImage = 'url("asset/poster/' + item.poster + '")'
        element.appendChild(poster)

        item.onClick = event => onClick(item)
        element.addEventListener("click", item.onClick)
        item.element = element

        carousel.appendChild(item.element)
      } else if (!item.element.parentNode) {
        item.enter = true
        item.onClick = event => onClick(item)
        item.element.addEventListener("click", item.onClick)
        carousel.appendChild(item.element)
      }

      item.element.style.zIndex = zIndex

      if (item.enter) {
        item.element.style.opacity = 1
        const translateX = `translateX(${item.x - itemWidth}px)`
        item.element.style.transform = `${translateZ} ${translateX}`
      }
    })

    reflow()

    // set positions to transition to
    items.forEach((item, i) => {
      const translateX = `translateX(${item.x}px)`
      const translateZ = `translateZ(${item.z}px)`

      item.element.style.transform = `${translateZ} ${translateX}`
    })
  }

  function onClick(item) {
    if (animTimer) {
      clearTimeout(animTimer)
    }

    const index = items.indexOf(item)

    // prevent hover interactions while animating
    carousel.classList.add("ex-carousel--animating")

    const pushing = items.slice(activeIndex, index).map(item => ({
      ...item,
      element: item.element.cloneNode(true),
    }))

    items.push(...pushing)

    activeIndex = index

    render()

    const onAnimComplete = () => {
      animTimer = undefined
      activeIndex = 0
      items.splice(0, index).forEach(item => carousel.removeChild(item.element))
      carousel.classList.add("ex-carousel--rendering")
      carousel.classList.remove("ex-carousel--animating")
    }

    animTimer = setTimeout(onAnimComplete, animSpeed)
  }
})

function reflow() {
  document.body.offsetHeight
}
