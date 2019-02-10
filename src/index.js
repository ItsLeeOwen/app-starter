import App from "app"
import "./index.scss"

console.log("index.js")

const app = new App()
app.greet("dzień dobry", "hello", process.env.GREETING)

document.addEventListener("DOMContentLoaded", () => {
  console.log("ok")
  projects()
})

function projects() {
  const projects = [].slice.call(document.querySelectorAll(".la-project"))

  projects.forEach(project => {
    project.addEventListener("click", onClickProject(project))
  })
}

const onClickProject = project => event => {
  const modal = project.querySelector(".la-project__modal-anim")
  const iframe = project.querySelector("iframe")

  if (project.classList.contains("la-project--active")) {
    document.body.classList.remove("la-noscroll")
    project.classList.remove("la-project--active")

    if (iframe) {
      setTimeout(() => {
        iframe.removeAttribute("src")
      }, 200)
    }

    hideUsingTransform(modal)
  } else {
    document.body.classList.add("la-noscroll")
    project.classList.add("la-project--active")

    showUsingTransform(modal, project.getBoundingClientRect())
    if (iframe) {
      setTimeout(() => {
        iframe.setAttribute(
          "src",
          `/asset/projects/${project.getAttribute("data-name")}/index.html`
        )
      }, 900)
    }
  }
}

function hideUsingTransform(target) {
  target.style.transform = `scaleX(1) scaleY(1)`
}

function showUsingTransform(target, bounds) {
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight
  const clientWidth = document.body.clientWidth

  // useClientWidth if allowing scrollbar
  const width = windowWidth

  const scaleY = windowHeight / bounds.height
  let scaleX = width / bounds.width
  const originY = 100 * (bounds.top / (windowHeight - bounds.height))
  const originX = 100 * (bounds.left / (width - bounds.width))

  // console.log("scaleX:", scaleX, Math.ceil(scaleX * 10000) * 0.0001)
  // console.log("scaleY:", scaleY)
  // console.log("originX:", originX)
  // console.log("originY:", originY)

  target.style.transformOrigin = `${originX}% ${originY}%`
  target.style.transform = `scaleX(${scaleX}) scaleY(${scaleY})`
}

function hideUsingBounds(target) {
  target.style.left = 0
  target.style.top = 0
  target.style.right = 0
  target.style.bottom = 0
  target.style.visibility = "hidden"
}

function showUsingBounds(target) {
  const bounds = target.getBoundingClientRect()
  const windowHeight = window.innerHeight
  const clientWidth = document.body.clientWidth

  target.style.left = `-${bounds.left}px`
  target.style.top = `-${bounds.top}px`
  target.style.right = `-${clientWidth - bounds.right}px`
  target.style.bottom = `-${windowHeight - bounds.bottom}px`
  target.style.visibility = "visible"
}
