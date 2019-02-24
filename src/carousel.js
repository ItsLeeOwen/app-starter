// javascript implementation

document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(`.${CLASS_CAROUSEL}`)

  const content = [
    { image: "asset/poster/terminator.jpg", data: "terminator" },
    { image: "asset/poster/pulpfiction.jpg", data: "pulpfiction" },
    { image: "asset/poster/scarface.jpg", data: "scarface" },
    { image: "asset/poster/ghostbusters.jpg", data: "ghostbusters" },
    { image: "asset/poster/goonies.jpg", data: "goonies" },
    { image: "asset/poster/terminator.jpg", data: "terminator" },
    { image: "asset/poster/pulpfiction.jpg", data: "pulpfiction" },
    { image: "asset/poster/scarface.jpg", data: "scarface" },
    { image: "asset/poster/ghostbusters.jpg", data: "ghostbusters" },
    { image: "asset/poster/goonies.jpg", data: "goonies" },
  ].map(item => {
    const element = document.createElement("div")
    element.style.backgroundImage = `url("${item.image}")`
    return {
      element,
      data: item.data,
    }
  })

  new Carousel({
    carousel,
    content,
    contentWidth: 365,
    onSelect: selected => {
      console.log("onSelect", selected)
    },
  })
})

const CLASS_CAROUSEL = "ilo-carousel"
const CLASS_CAROUSEL_ANIMATING = `${CLASS_CAROUSEL}--animating`
const CLASS_CAROUSEL_RENDERING = `${CLASS_CAROUSEL}--rendering`
const CLASS_CAROUSEL_ITEM = "ilo-carousel__item"
const CLASS_CAROUSEL_CONTENT = "ilo-carousel__content"

export default function Carousel({
  speed = 750,
  carousel,
  content,
  contentWidth = 365,
  depth = 10,
  onSelect,
}) {
  if (!carousel) {
    throw new Error("carousel.js opts.carousel is required")
  }
  if (!contentWidth) {
    throw new Error("carousel.js opts.contentWidth is required")
  }

  let animTimer
  let activeIndex = 0

  const items = content.map(content => ({
    content,
  }))

  render()

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      switch (mutation.type) {
        case "attributes":
          console.log("mutation", JSON.stringify(mutation.target.classList))
          if (carousel.classList.contains(CLASS_CAROUSEL_RENDERING)) {
            console.log(" rendering")
            render()
            reflow()
            carousel.classList.remove(CLASS_CAROUSEL_RENDERING)
            return
          }
          //console.log("mutation:", mutation)
          if (carousel.classList.contains(CLASS_CAROUSEL_ANIMATING)) {
            console.log("animating")
            render()
            return
          }
          break
      }
    }
  })

  // observer.observe(carousel, {
  //   attributes: true,
  //   childList: false,
  //   subtree: false,
  // })

  function render() {
    // iterate through all items, create dom & assign position
    const l = items.length

    // first loop sets immediate positioning
    items.forEach((item, i) => {
      const zIndex = l - i
      const x = activeIndex * -contentWidth
      const z = (i - activeIndex) * -depth

      item.z = z
      item.x = x
      item.zIndex = zIndex

      const translateZ = `translateZ(${item.z}px)`

      if (!item.element) {
        item.enter = true
        const element = document.createElement("div")
        element.classList.add(CLASS_CAROUSEL_ITEM)
        //element.setAttribute("tabindex", i)
        item.content.element.classList.add(CLASS_CAROUSEL_CONTENT)
        // const image = document.createElement("div")
        // image.classList.add(CLASS_CAROUSEL_CONTENT)
        // image.style.backgroundImage = `url("${item.image}")`
        element.appendChild(item.content.element)

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
        const translateX = `translateX(${item.x - contentWidth}px)`
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

    if ("function" === typeof onSelect) {
      onSelect(item.content)
    }

    console.log("onClick")

    const index = items.indexOf(item)

    // prevent hover interactions while animating
    carousel.classList.add(CLASS_CAROUSEL_ANIMATING)

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
      renderImmediate()
      carousel.classList.remove(CLASS_CAROUSEL_ANIMATING)
    }

    animTimer = setTimeout(onAnimComplete, speed)
  }

  function renderImmediate() {
    carousel.classList.add(CLASS_CAROUSEL_RENDERING)
    render()
    reflow()
    carousel.classList.remove(CLASS_CAROUSEL_RENDERING)
  }
}

// flush class/style changes to dom
function reflow() {
  document.body.offsetHeight
}
