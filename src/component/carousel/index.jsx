import Carousel from "carousel-stack/src/carousel"
import "./index.scss"

export default {
  data: () => ({
    source: "JSX Component",
  }),

  mounted() {
    const content = this.items.map(item => {
      const element = document.createElement("div")
      element.style.backgroundImage = `url("${item.image}")`
      return {
        element,
        data: item,
      }
    })

    new Carousel({
      carousel: this.$el,
      content,
      contentHeight: this.itemHeight,
      contentWidth: this.itemWidth,
      onSelect: selected => {
        if ("function" === typeof this.onSelect) {
          this.onSelect(selected)
        }
      },
    })
  },

  props: ["items", "itemHeight", "itemWidth", "onSelect"],

  render() {
    return <div class="vue-carousel" />
  },
}
